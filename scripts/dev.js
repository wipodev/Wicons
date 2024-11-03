#!/usr/bin/env node

import { rmSync, writeFileSync } from "fs";
import { exec } from "child_process";
import { join } from "path";
import { createSvgIconsMap } from "../bin/svgMapGenerator.js";
import { copy } from "../lib/utils.js";
import { generateWicons } from "../lib/generateWicons.js";
import { generateIconsBox, deleteIconsBox } from "../lib/htmlGenerator.js";

const routesSVG = createSvgIconsMap({ output: "/src/src/", embed: true });
const iconsToUse = Object.keys(routesSVG);
generateIconsBox(iconsToUse);
const cssContent = generateWicons(iconsToUse, routesSVG);
const cssFilePath = join(process.cwd(), "/src/assets/css/wicons.embed.all.css");

writeFileSync(cssFilePath, cssContent);

copy("lib/generateWicons.js", "src/lib/generateWicons.js");
copy("lib/svg/", "src/src/svg/");

const servorProcess = exec("npx servor src index.html 8080 --reload");

servorProcess.stdout.on("data", (data) => {
  console.log(data.toString());
});

servorProcess.stderr.on("data", (data) => {
  console.error(data.toString());
});

process.on("SIGINT", () => {
  console.log("\nClosing the server...");
  servorProcess.kill("SIGINT");
  try {
    deleteIconsBox();
    rmSync(cssFilePath);
    rmSync(join(process.cwd(), "/src/src/"), { recursive: true, force: true });
    rmSync(join(process.cwd(), "/src/lib/"), { recursive: true, force: true });
  } catch (err) {
    console.error("Error deleting file:", err);
  }
  process.exit();
});
