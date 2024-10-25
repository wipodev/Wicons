export const base = {
  all: `.wi,
[data-icon]::before {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-size: 1em auto;
  background-repeat: no-repeat;
  vertical-align: -0.125em;
  filter: invert(0);
  content: "";
}`,
  spacing: `[data-icon]:not(:empty)::before {
  margin-inline-end: calc(var(--wi-spacing) * 0.5);
}`,
  align: `[data-icon]:empty {
  text-align: center;
}`,
  dark: `[data-theme="dark"] .wi,
[data-theme="dark"] [data-icon]::before {
  filter: brightness(0) invert(1);
}`,
};
