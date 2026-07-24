import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rosterPath = path.join(root, "src/data/genVTrainerRoster.json");
const apiUrl = "https://archives.bulbagarden.net/w/api.php";
const category = "Category:Generation V Trainer sprites";
const userAgent = "PortfolioMon-Showdown trainer sync (local development)";

/**
 * @typedef {object} TrainerRecord
 * @property {string} sourceFile
 * @property {string} battleSprite
 * @property {boolean} hasChibi
 * @property {string | null} chibiSourceFile
 * @property {string} chibiSprite
 */

/** @type {TrainerRecord[]} */
const roster = JSON.parse(await fs.readFile(rosterPath, "utf8"));

/**
 * @param {Record<string, string>} parameters
 * @returns {Promise<any>}
 */
async function getJson(parameters) {
  const url = new URL(apiUrl);
  url.search = new URLSearchParams({ format: "json", ...parameters }).toString();
  const response = await fetch(url, { headers: { "user-agent": userAgent } });
  if (!response.ok) throw new Error(`${response.status} while loading ${url}`);
  return response.json();
}

async function getCategoryFiles() {
  const files = [];
  let continuation = {};

  do {
    const payload = await getJson({
      action: "query",
      list: "categorymembers",
      cmtitle: category,
      cmtype: "file",
      cmlimit: "max",
      ...continuation,
    });
    /** @type {{ title: string }[]} */
    const categoryMembers = payload.query.categorymembers;
    files.push(...categoryMembers.map(({ title }) => title.replace(/^File:/, "")));
    continuation = payload.continue ?? null;
  } while (continuation);

  return files;
}

/** @param {string[]} fileNames */
async function getOriginalFileUrls(fileNames) {
  const output = new Map();

  for (let index = 0; index < fileNames.length; index += 50) {
    const batch = fileNames.slice(index, index + 50);
    const payload = await getJson({
      action: "query",
      prop: "imageinfo",
      iiprop: "url",
      titles: batch.map((name) => `File:${name}`).join("|"),
    });

    for (const page of Object.values(payload.query.pages)) {
      const fileName = page.title?.replace(/^File:/, "");
      const sourceUrl = page.imageinfo?.[0]?.url;
      if (fileName && sourceUrl) output.set(fileName, sourceUrl);
    }
  }

  return output;
}

/** @param {string} sourceUrl @param {string} publicPath */
async function downloadFile(sourceUrl, publicPath) {
  const response = await fetch(sourceUrl, { headers: { "user-agent": userAgent } });
  if (!response.ok) throw new Error(`${response.status} while downloading ${sourceUrl}`);
  const destination = path.join(root, "public", publicPath.replace(/^\//, ""));
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, Buffer.from(await response.arrayBuffer()));
}

/** @param {Array<() => Promise<void>>} jobs @param {number} concurrency */
async function runPool(jobs, concurrency = 12) {
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < jobs.length) {
      const job = jobs[nextIndex++];
      await job();
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
}

const categoryFiles = await getCategoryFiles();
const rosterBattleFiles = new Set(roster.map(({ sourceFile }) => sourceFile));
const missingFromRoster = categoryFiles.filter((file) => !rosterBattleFiles.has(file));
const absentFromCategory = [...rosterBattleFiles].filter((file) => !categoryFiles.includes(file));

if (missingFromRoster.length || absentFromCategory.length) {
  throw new Error(
    [
      missingFromRoster.length
        ? `Category files missing from the roster: ${missingFromRoster.join(", ")}`
        : null,
      absentFromCategory.length
        ? `Roster files missing from the category: ${absentFromCategory.join(", ")}`
        : null,
    ]
      .filter(Boolean)
      .join("\n"),
  );
}

const assetTargets = new Map();
for (const trainer of roster) {
  assetTargets.set(trainer.sourceFile, trainer.battleSprite);
  if (trainer.hasChibi && trainer.chibiSourceFile) {
    assetTargets.set(trainer.chibiSourceFile, trainer.chibiSprite);
  }
}

const remoteUrls = await getOriginalFileUrls([...assetTargets.keys()]);
const unresolved = [...assetTargets.keys()].filter((file) => !remoteUrls.has(file));
if (unresolved.length) throw new Error(`Could not resolve: ${unresolved.join(", ")}`);

await runPool(
  [...assetTargets].map(([fileName, publicPath]) => () =>
    downloadFile(remoteUrls.get(fileName), publicPath),
  ),
);

console.log(
  `Synced ${roster.length} Generation V trainers: ${rosterBattleFiles.size} battle sprites and ${
    assetTargets.size - rosterBattleFiles.size
  } unique chibi sprites.`,
);
