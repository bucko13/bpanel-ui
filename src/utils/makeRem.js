export default (size, fontSizeBase = 1) =>
  (size * fontSizeBase).toString().concat('rem');
