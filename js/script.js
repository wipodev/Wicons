import { icons } from "./icons.js";
import { base } from "./base.js";

const toggleButton = document.querySelector("#theme-toggle");

toggleButton.addEventListener("click", () => {
  const newTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
});

document.querySelector("#generate-css").addEventListener("click", () => {
  const selectedIcons = document.querySelectorAll('input[name="icon"]:checked');
  const cssRoot = [];
  const cssIcons = [];
  const cssBase = [base.all, base.spacing, base.align, base.dark];

  selectedIcons.forEach((icon) => {
    cssRoot.push(`--wi-icon-${icon.value}: url("${icons[icon.value]}");`);
    cssIcons.push(`.wi-${icon.value}, 
[data-icon="${icon.value}"]::before {
  background-image: var(--wi-icon-${icon.value});
}`);
  });

  const cssContent = `:root {
  ${cssRoot.join("\n")}
--wi-spacing: 1rem;
}
  
  ${cssBase.join("\n\n")}

  ${cssIcons.join("\n\n")}`;

  document.querySelector("#output-css").value = cssContent;
});
