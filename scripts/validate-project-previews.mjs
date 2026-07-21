import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(
  await readFile(path.join(root, "scripts/project-preview-config.json"), "utf8")
);
const gameContext = await readFile(
  path.join(root, "src/context/gameContext.tsx"),
  "utf8"
);
const rosterSource = gameContext.slice(
  gameContext.indexOf("export const portfolioMonData"),
  gameContext.indexOf("export const typeChart")
);
const roster = [
  ...rosterSource.matchAll(
    /id:\s*(\d+),[\s\S]*?name:\s*"([^"]+)",[\s\S]*?url:\s*"[^"]+",[\s\S]*?image:\s*"([^"]+)"/g
  ),
].map((match) => ({
  id: Number(match[1]),
  name: match[2],
  output: `public${match[3]}`,
}));

const errors = [];
if (config.format !== "png") errors.push("Preview format must be png.");
if (config.viewport.width !== 1280 || config.viewport.height !== 720) {
  errors.push("Preview viewport must be 1280x720.");
}
if (config.projects.length !== roster.length) {
  errors.push(
    `Config has ${config.projects.length} projects; roster has ${roster.length}.`
  );
}

for (const project of config.projects) {
  const mon = roster.find(({ id }) => id === project.id);
  if (!mon) {
    errors.push(
      `Config id ${project.id} (${project.name}) is not in the roster.`
    );
    continue;
  }
  if (mon.name !== project.name) {
    errors.push(
      `Config id ${project.id} is ${project.name}; roster uses ${mon.name}.`
    );
  }
  if (mon.output !== project.output) {
    errors.push(
      `${project.name} outputs to ${project.output}; roster uses ${mon.output}.`
    );
  }

  try {
    const png = await readFile(path.join(root, project.output));
    const signature = png.subarray(0, 8).toString("hex");
    if (signature !== "89504e470d0a1a0a") {
      errors.push(`${project.output} is not a PNG file.`);
      continue;
    }
    const width = png.readUInt32BE(16);
    const height = png.readUInt32BE(20);
    if (width !== config.viewport.width || height !== config.viewport.height) {
      errors.push(
        `${project.output} is ${width}x${height}, expected 1280x720.`
      );
    }
  } catch (error) {
    errors.push(`${project.output} could not be read: ${error.message}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${roster.length} project previews at 1280x720 PNG.`);
