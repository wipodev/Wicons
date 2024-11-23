import fs from "fs";
import path from "path";
import { minify } from "csso";
import { ensureDirectoryExists, svgToDataURI, getConfig, getVersion } from "./utils.js";

export async function generateStyles(options) {
  try {
    const config = await getConfig();

    const finalOptions = {
      path:
        options.path || config.path || fs.existsSync(path.join(process.cwd(), "svg"))
          ? "svg"
          : "node_modules/wicons/svg",
      minify: options.minify || config.minify || true,
      output: options.output || config.output || "dist",
      filename: options.filename || config.filename || "wicons",
      embed: options.embed || config.embed || true,
      relativePath: options.relativePath || config.relativePath || false,
      include: options.include || config.include || null,
    };

    if (!fs.existsSync(finalOptions.path)) {
      throw new Error(`The directory ${finalOptions.path} does not exist.`);
    }

    if (!finalOptions.relativePath && !finalOptions.embed) {
      throw new Error("You must specify relativePath if embed is true");
    }

    const outputFilename = `${finalOptions.filename}.${finalOptions.embed ? "embed" : "routes"}${
      finalOptions.minify ? ".min" : ""
    }.css`;

    const iconsToInclude =
      typeof finalOptions.include === "string" ? getSelectedIcons(finalOptions.include) : finalOptions.include;

    const dataSVG = getRoutesSVG(finalOptions.path, finalOptions.embed, finalOptions.relativePath);
    const iconsToUse = iconsToInclude || Object.keys(dataSVG);
    const cssContent = createStyles(iconsToUse, dataSVG);

    const outputCss = finalOptions.minify ? minify(cssContent).css : cssContent;
    const outputPath = ensureDirectoryExists(finalOptions.output);
    const outputFilePath = path.join(outputPath, outputFilename);

    fs.writeFileSync(outputFilePath, outputCss);

    console.log(`Custom Wicons CSS generated successfully in ${outputFilePath}!`);
  } catch (error) {
    console.error(error);
  }
}

export function getRoutesSVG(folderPath, embedded = true, relativePath) {
  const iconsRoutes = {};

  function readDirRecursively(currentPath) {
    const files = fs.readdirSync(currentPath);

    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        readDirRecursively(filePath);
      } else if (file.endsWith(".svg")) {
        const key = path.parse(file).name;

        if (embedded) {
          const svgContent = fs.readFileSync(filePath, "utf8");
          iconsRoutes[key] = svgToDataURI(svgContent);
        } else {
          if (!relativePath) {
            throw new Error("You must specify relativePath if embed is true");
          }
          iconsRoutes[key] = `${relativePath}${file}`;
        }
      }
    });
  }

  readDirRecursively(folderPath);
  return iconsRoutes;
}

function createStyles(selectedIcons, icons) {
  const cssRoot = [];
  const cssIcons = [];

  selectedIcons.forEach((icon) => {
    cssRoot.push(`--wi-icon-${icon}: url("${icons[icon]}");`);
    cssIcons.push(`.wi-${icon}, 
[data-icon="${icon}"]::before {
  -webkit-mask-image: var(--wi-icon-${icon});
  mask-image: var(--wi-icon-${icon});
}`);
  });

  return `@charset "UTF-8";
/*!
 * Wicons CSS v${getVersion()} (https://wipodev.com/wicons)
 * Copyright 2024-present WipoDev - Licensed under MIT
 */
:root {
${cssRoot.join("\n")}
--wi-spacing: 1rem;
}

${template}

${cssIcons.join("\n\n")}`;
}

const template = `.wi,
[data-icon]::before {
  display: inline-block;
  width: 1em;
  height: 1em;
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: currentColor;
  vertical-align: middle;
  content: "";
}

[data-icon]:not(:empty)::before {
  margin-inline-end: calc(var(--wi-spacing) * 0.5);
}

[data-icon]:empty {
  text-align: center;
}`;

function getSelectedIcons(configPath) {
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
      return config.include || [];
    } catch (error) {
      console.error(`Error reading icons configuration from ${configPath}:`, error);
    }
  }
  return [];
}
