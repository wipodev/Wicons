import { generateWicons } from "/lib/generateWicons.js";
import { icons } from "/src/iconsEmbed.js";

export function generateCSS() {
  document.querySelector("#generate-css").addEventListener("click", () => {
    const selectedIcons = Array.from(document.querySelectorAll('input[name="icon"]:checked')).map(
      (input) => input.value
    );
    const cssContent = generateWicons(selectedIcons, icons);
    document.querySelector("#output-css").textContent = cssContent;
  });
}
