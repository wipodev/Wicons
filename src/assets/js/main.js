import { generateWicons } from "/lib/generateWicons.js";
import { icons } from "/src/iconsEmbed.js";
import { downloadCSS } from "/assets/js/utils.js";
import { version } from "/assets/js/version.js";

export function generateCSS() {
  document.querySelector("#generate-css").addEventListener("click", () => {
    const selectedIcons = Array.from(document.querySelectorAll('input[name="icon"]:checked')).map(
      (input) => input.value
    );
    const cssContent = generateWicons(selectedIcons, icons, version);
    const outputElement = document.querySelector("#output-css");
    outputElement.innerHTML = cssContent;
    Prism.highlightElement(outputElement);

    document.querySelector("#copy-code").addEventListener("click", () => {
      navigator.clipboard.writeText(cssContent).then(() => {
        alert("CSS code copied to clipboard.");
      });
    });

    document.querySelector("#download-code").addEventListener("click", () => downloadCSS(cssContent));
  });
}
