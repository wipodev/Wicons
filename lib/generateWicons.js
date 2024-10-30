export function generateWicons(selectedIcons, icons) {
  const cssRoot = [];
  const cssIcons = [];

  selectedIcons.forEach((icon) => {
    cssRoot.push(`--wi-icon-${icon}: url("${icons[icon]}");`);
    cssIcons.push(`.wi-${icon}, 
[data-icon="${icon}"]::before {
  -webkit-mask: var(--wi-icon-${icon});
  mask: var(--wi-icon-${icon});
}`);
  });

  return `:root {
${cssRoot.join("\n")}
--wi-spacing: 1rem;
}

${template}

${cssIcons.join("\n\n")}`;
}

const template = `.wi,
[data-icon]::before {
  display: inline-block;
  width: 1em;
  height: 1em;
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: currentColor;
  vertical-align: middle;
  content: "";
}

[data-icon]:not(:empty)::before {
  margin-inline-end: calc(var(--wi-spacing) * 0.5);
}

[data-icon]:empty {
  text-align: center;
}`;
