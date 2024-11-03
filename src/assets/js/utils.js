export function downloadCSS(cssContent, fileName = "wicons.css") {
  const blob = new Blob([cssContent], { type: "text/css" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function minifyCSS(css) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");
  css = css.replace(/\s{2,}/g, " ").replace(/\n/g, "");
  css = css.replace(/\s*([:;{}])\s*/g, "$1");
  return css.trim();
}

export function svgToDataURI(svg) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export function dataURItoSVG(dataURI) {
  return Buffer.from(dataURI.split(",")[1], "base64").toString("utf-8");
}

function handleSVGUpload(event) {
  const file = event.target.files[0];

  if (file && file.type === "image/svg+xml") {
    const reader = new FileReader();

    reader.onload = function (e) {
      const svgContent = e.target.result;
      const encodedSVG = encodeURIComponent(svgContent);
      const dataURL = `data:image/svg+xml,${encodedSVG}`;

      return {
        svgContent,
        dataURL,
      };
    };

    reader.readAsText(file);
  } else {
    alert("Please select a valid SVG file.");
  }
}

export function detectLoadSVG() {
  document.getElementById("svgInput").addEventListener("change", function (event) {
    const svg = handleSVGUpload(event);
    if (svg) {
      document.querySelector("#svgContent").textContent = svg.svgContent;
      document.querySelector("#svgURL").textContent = svg.dataURL;
    }
  });
}

function toggleTheme() {
  const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

export function loadTheme() {
  const theme = localStorage.getItem("theme");
  document.documentElement.setAttribute("data-theme", theme ? theme : "light");
  document.querySelector("body > header nav > a[data-theme-toggle]").addEventListener("click", toggleTheme);
}

export function handleMenu() {
  document.querySelector("body > header nav > button").addEventListener("click", () => {
    document.querySelector("body > header nav > div").classList.toggle("open");
  });

  document.querySelector("body > header nav > div").addEventListener("click", () => {
    document.querySelector("body > header nav > div").classList.remove("open");
  });
}
