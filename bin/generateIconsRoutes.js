#!/usr/bin/env node

import { writeFileSync } from "fs";
import { join } from "path";
import { program } from "commander";
import { getRoutesSVG } from "../lib/utils.js";

program
  .option("-p, --path <path>", "Path to SVG icons folder", join(process.cwd(), "lib/svg"))
  .option("-o, --output <output>", "Output JavaScript file", "/public/src/iconsRoutes.js")
  .option("-e, --embed", "Embed SVGs as Data URIs", false);

program.parse(process.argv);

const options = program.opts();
const svgPath = options.path;
const embed = options.embed;
const outputFile = embed ? "/public/src/iconsEmbed.js" : options.output;

const routesSVG = getRoutesSVG(svgPath, embed);

const fileContent = `export const icons = ${JSON.stringify(routesSVG, null, 2)};`;

// Escribir el archivo de salida
const outputFilePath = join(process.cwd(), outputFile);
writeFileSync(outputFilePath, fileContent);

console.log(`Icons routes file generated successfully at ${outputFilePath}!`);
