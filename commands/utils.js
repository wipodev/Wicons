import fs from "fs";
import path from "path";

export function getVersion() {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "node_modules/wicons/package.json"), "utf8")).version;
}

export function svgToDataURI(svg) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export function move(source, destination, replace = true) {
  copy(source, destination, replace);
  fs.rmSync(source, { recursive: true, force: true });
}

export function copy(source, destination, replace = true) {
  try {
    if (!fs.existsSync(source)) {
      throw new Error(`Source path "${source}" does not exist.`);
    }

    const sourceStats = fs.statSync(source);

    if (sourceStats.isFile()) {
      const destDir = path.join(destination, "..");
      ensureDirectoryExists(destDir);
      if (!replace && fs.existsSync(destination)) return;
      fs.copyFileSync(source, destination);
    } else if (sourceStats.isDirectory()) {
      ensureDirectoryExists(destination);
      const items = fs.readdirSync(source);
      for (const item of items) {
        const sourceItem = path.join(source, item);
        const destItem = path.join(destination, item);

        try {
          copy(sourceItem, destItem, replace);
        } catch (error) {
          console.error(`❌ Error copying item "${item}": ${error}`);
        }
      }
    }
  } catch (error) {
    console.error(`❌ ${error}`);
  }
}

export async function getConfig(root = "") {
  const configPath = path.join(process.cwd(), root, "wicons.config.js");
  if (fs.existsSync(configPath)) {
    try {
      const config = (await import(`file://${configPath}`)).default || {};
      return config;
    } catch (error) {
      console.error("Error loading wivex.config.js:", error);
      return {};
    }
  }
  console.warn("No wivex.config.js file found, using default options.");
  return {};
}

export function ensureDirectoryExists(dir) {
  const outputPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  return outputPath;
}
