#!/usr/bin/env node

import { program } from "commander";
import { generateStyles } from "../commands/stylesGenerator.js";
import { getVersion } from "../commands/utils.js";

program
  .name("wicons")
  .version("v" + getVersion(), "-v, --version", "Show version")
  .helpCommand();

program
  .command("styles")
  .description("Generate a CSS file with optimized SVG icons")
  .option("-p, --path <path>", "Path to SVG icons folder")
  .option("-m, --minify", "Execution mode Minify")
  .option("-o, --output <output>", "Output folder")
  .option("-f, --filename <filename>", "Output file name")
  .option("-e, --embed", "Embed SVGs as Data URIs")
  .option("-r, --relativePath", "Use relative paths in the CSS")
  .option("-i, --include", "Include selected icons in the CSS")
  .action((options) => generateStyles(options));

program
  .command("map")
  .description("Generate a JavaScript file with optimized SVG icons")
  .option("-p, --path <path>", "Path to SVG icons folder")
  .option("-o, --output <output>", "Output file name")
  .option("-f, --filename <filename>", "Output file name")
  .option("-e, --embed", "Embed SVGs as Data URIs")
  .option("-r, --relativePath", "Use relative paths in the CSS")
  .action((options) => createSvgIconsMap(options));

program.parse(process.argv);
