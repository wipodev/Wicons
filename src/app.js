import { detectLoadSVG, loadTheme, handleMenu } from "./assets/js/utils.js";

window.addEventListener("load", () => {
  loadTheme();
  handleMenu();
  detectLoadSVG();
});
