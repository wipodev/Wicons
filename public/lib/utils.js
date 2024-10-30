export function downloadCSS(minifiedCSS, fileName = "wicons.css") {
  const blob = new Blob([minifiedCSS], { type: "text/css" });
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
