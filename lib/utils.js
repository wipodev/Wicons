import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync, readFileSync } from "fs";
import { join, parse, relative } from "path";

/**
 * Creates an object with SVG file names as keys and their paths as values
 * @param {string} folderPath - The path to the folder containing the SVG files
 * @returns {Object} - An object with the SVG file names as keys and the paths as values
 */
export function getRoutesSVG(folderPath, embedded = false) {
  const iconsRoutes = {};
  const files = readdirSync(folderPath);

  files.forEach((file) => {
    if (file.endsWith(".svg")) {
      const key = parse(file).name;

      if (embedded) {
        const svgContent = readFileSync(join(folderPath, file), "utf8");
        iconsRoutes[key] = svgToDataURI(svgContent);
      } else {
        const relativePath = "/" + relative(process.cwd(), join(folderPath, file)).replace(/\\/g, "/");
        iconsRoutes[key] = relativePath;
      }
    }
  });

  return iconsRoutes;
}

export function svgToDataURI(svg) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export function dataURItoSVG(dataURI) {
  return Buffer.from(dataURI.split(",")[1], "base64").toString("utf-8");
}

export function copy(source, destination) {
  if (!existsSync(source)) {
    throw new Error(`Source path "${source}" does not exist.`);
  }
  const sourceStats = statSync(source);
  if (sourceStats.isFile()) {
    const destDir = join(destination, "..");
    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }
    copyFileSync(source, destination);
  } else if (sourceStats.isDirectory()) {
    ensureDirectoryExists(destination);
    const items = readdirSync(source);
    for (const item of items) {
      const sourceItem = join(source, item);
      const destItem = join(destination, item);
      copy(sourceItem, destItem);
    }
  }
}

export function ensureDirectoryExists(dir) {
  const outputPath = join(process.cwd(), dir);
  if (!existsSync(outputPath)) {
    mkdirSync(outputPath, { recursive: true });
  }
  return outputPath;
}
