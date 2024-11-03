import { readFile, writeFile } from "fs";
import * as cheerio from "cheerio";

function replaceTagContent(filePath, tag, newContent) {
  readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return;
    }
    const $ = cheerio.load(data);
    $(tag).html(newContent);

    writeFile(filePath, $.html(), "utf8", (err) => {
      if (err) {
        console.error("Error al escribir en el archivo:", err);
      } else {
        console.log(`El contenido de la etiqueta <${tag}> ha sido reemplazado correctamente.`);
      }
    });
  });
}

export function generateIconsBox(icons) {
  const filePath = "src/index.html";
  const tag = "main";
  const newContent = `
<h1>Select Icons to Generate CSS</h1>
${icons
  .map(
    (icon) => `
<div class="icon">
  <i class="wi wi-${icon}"></i>
  <label>
  ${icon}
  <input type="checkbox" name="icon">
  </label>
</div>`
  )
  .join("")}`;

  replaceTagContent(filePath, tag, newContent);
}
