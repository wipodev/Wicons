#!/usr/bin/env node

/**
 * Wicons - CLI tool to generate custom CSS files with optimized SVG icons.
 *
 * This tool allows you to select a set of icons and generate a CSS file containing
 * only the chosen icons, optimizing the weight and loading of the CSS in your web project.
 *
 * Author: WipoDev
 * Created by: WipoDev
 * License: MIT
 */

import { writeFileSync, existsSync } from "fs";
import { join } from "path";
import { minify } from "csso";
import { program } from "commander";
import { generateWicons } from "../lib/generateWicons.js";
import { getRoutesSVG, ensureDirectoryExists, getVersion } from "../lib/utils.js";

const defaultSvgPath = existsSync(join(process.cwd(), "lib/svg")) ? "lib/svg" : "node_modules/wicons/lib/svg";

program
  .option("-p, --path <path>", "Path to SVG icons folder", defaultSvgPath)
  .option("-m, --mode <mode>", "Execution mode (build or dev)", "build")
  .option("-o, --output <output>", "Output folder", null)
  .option("-f, --filename <filename>", "Output file name", null)
  .option("-e, --embed", "Embed SVGs as Data URIs", false)
  .version("v" + getVersion(), "-v, --version", "Show version")
  .helpCommand();

program.parse(process.argv);

const options = program.opts();

if (options.helpCommand) {
  program.outputHelp();
  process.exit(0);
}

const svgPath = join(process.cwd(), options.path);
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
