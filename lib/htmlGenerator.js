import { readFileSync, writeFileSync } from "fs";
import * as cheerio from "cheerio";

function replaceTagContent(filePath, tag, newContent) {
  try {
    const data = readFileSync(filePath, "utf8");
    const $ = cheerio.load(data);
    $(tag).html(newContent);

    writeFileSync(filePath, $.html(), "utf8");
    console.log(`The content of the <${tag}> tag has been successfully replaced.`);
  } catch (error) {
    console.error("Error writing to file:", err);
  }
}

export function generateIconsBox(icons, filePath = "src/index.html") {
  const tag = "main";
  const newContent = `
<h1>Select Icons to Generate CSS</h1>
${icons
  .map(
    (icon) => `
<article class="icon">
  <input type="checkbox" name="icon" value="${icon}">
  <i class="wi wi-${icon}"></i>
  <label>
  ${icon}
  </label>
</article>`
  )
  .join("")}
<button id="generate-css">Generate CSS</button>`;

  replaceTagContent(filePath, tag, newContent);
}

export function deleteIconsBox(filePath = "src/index.html") {
  const tag = "main";
  replaceTagContent(filePath, tag, "");
}
