#!/usr/bin/env node

import { writeFileSync } from "fs";
import { join } from "path";
import { program } from "commander";
import { getRoutesSVG, ensureDirectoryExists } from "../lib/utils.js";

/**
 * Creates a JavaScript file with an object mapping SVG icons.
 * @param {string} svgPath - Path to SVG icons folder.
 * @param {string} outputFile - Path to the output JavaScript file.
 * @param {boolean} embed - Whether to embed SVGs as Data URIs.
 */
export function createSvgIconsMap({ svgPath = join(process.cwd(), "lib/svg"), output = null, embed = false } = {}) {
  const outputDir = output || "/svgMap/";
  const finalOutput = ensureDirectoryExists(outputDir);
  const finalOutputFile = embed ? `${finalOutput}iconsEmbed.js` : `${finalOutput}iconsRoutes.js`;
  const routesSVG = getRoutesSVG(svgPath, embed);
  const fileContent = `export const icons = ${JSON.stringify(routesSVG, null, 2)};`;

  writeFileSync(finalOutputFile, fileContent);
  console.log(`Icons routes file generated successfully at ${finalOutputFile}!`);

  return routesSVG;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  program
    .option("-p, --path <path>", "Path to SVG icons folder", join(process.cwd(), "lib/svg"))
    .option("-o, --output <output>", "Output JavaScript file", null)
    .option("-e, --embed", "Embed SVGs as Data URIs", false);

  program.parse(process.argv);

  const options = program.opts();
  createSvgIconsMap({
    svgPath: options.path,
    output: options.output,
    embed: options.embed,
  });
}
