document.getElementById("svgInput").addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file && file.type === "image/svg+xml") {
    const reader = new FileReader();

    // Lee el archivo como texto
    reader.onload = function (e) {
      const svgContent = e.target.result;

      // Mostrar el contenido del SVG en el <pre> (puedes eliminar esta línea si no la necesitas)
      document.getElementById("svgContent").textContent = svgContent;

      // Ejemplo de conversión a URL de datos
      const encodedSVG = encodeURIComponent(svgContent);
      const dataURL = `data:image/svg+xml,${encodedSVG}`;

      console.log("SVG como Data URL:", dataURL);
    };

    reader.readAsText(file);
  } else {
    alert("Por favor, selecciona un archivo SVG válido.");
  }
});

const toggleButton = document.querySelector("#theme-toggle");

toggleButton.addEventListener("click", () => {
  const newTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
});
