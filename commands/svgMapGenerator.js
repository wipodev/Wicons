import fs from "fs";
import path from "path";
import { getConfig } from "./utils.js";
import { getRoutesSVG } from "./stylesGenerator.js";
import path from "path";

export async function createSvgIconsMap(options) {
  try {
    const config = await getConfig();

    const finalOptions = {
      path:
        options.path || config.path || fs.existsSync(path.join(process.cwd(), "svg"))
          ? "svg"
          : "node_modules/wicons/svg",
      output: options.output || config.output || ".",
      filename: options.filename || config.filename || "wicons",
      embed: options.embed || config.embed || false,
      relativePath: options.relativePath || config.relativePath || false,
    };

    if (!fs.existsSync(finalOptions.path)) {
      throw new Error(`The directory ${finalOptions.path} does not exist.`);
    }

    const outputFile = path.join(
      finalOptions.output,
      `${finalOptions.filename}.${finalOptions.embed ? "embed" : "routes"}.map.js`
    );

    const dataSVG = getRoutesSVG(finalOptions.path, finalOptions.embed, finalOptions.relativePath);
    const fileContent = `export const icons = ${JSON.stringify(dataSVG, null, 2)};`;

    fs.writeFileSync(outputFile, fileContent);
  } catch (error) {
    console.error("Error creating SVG icons map:", error);
  }
}
