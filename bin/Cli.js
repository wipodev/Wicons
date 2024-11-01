#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { minify } from "csso";
import { program } from "commander";
import { generateWicons } from "../lib/generateWicons.js";
import { getRoutesSVG, ensureDirectoryExists } from "../lib/utils.js";

program
  .option("-p, --path <path>", "Path to SVG icons folder", join(process.cwd(), "lib/svg"))
  .option("-m, --mode <mode>", "Execution mode (build or dev)", "build")
  .option("-o, --output <output>", "Output folder", null)
  .option("-f, --filename <filename>", "Output file name", null)
  .option("-e, --embed", "Embed SVGs as Data URIs", false);

program.parse(process.argv);

const options = program.opts();
const svgPath = options.path;
const mode = options.mode;
const embed = options.embed;
const outputDir = options.output || (mode === "dev" ? "dev" : "dist");

const embedPart = embed ? "embed" : "routes";
const modePart = mode === "build" ? ".min" : "";
const outputFilename = options.filename || `wicons.${embedPart}${modePart}.css`;

const outputPath = ensureDirectoryExists(outputDir);

const routesSVG = getRoutesSVG(svgPath, embed);
const iconsToUse = Object.keys(routesSVG);
const cssContent = generateWicons(iconsToUse, routesSVG);

const outputCss = mode === "build" ? minify(cssContent).css : cssContent;
const outputFilePath = join(outputPath, outputFilename);

writeFileSync(outputFilePath, outputCss);

console.log(`Custom Wicons CSS generated successfully in ${outputFilePath}!`);
