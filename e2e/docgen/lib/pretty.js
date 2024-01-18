const prettier = require('prettier');

const prettierOptions = {
  printWidth: 10_000,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  trailingComma: 'es5',
  proseWrap: 'never',
};

async function prettyMd(md) {
  return await prettier.format(md, { parser: 'markdown', ...prettierOptions });
}

async function prettyHtml(html) {
  return await prettier.format(html, { parser: 'html', ...prettierOptions });
}

module.exports = {
  prettyMd,
  prettyHtml,
};
