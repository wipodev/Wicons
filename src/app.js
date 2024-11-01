import { generateCSS } from "./assets/js/main.js";
import { detectLoadSVG, loadTheme, handleMenu } from "./assets/js/utils.js";

window.addEventListener("load", () => {
  loadTheme();
  handleMenu();
  generateCSS();
  detectLoadSVG();
});
