const prettier = require('prettier');

const prettierOptions = {
  printWidth: 10_000,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  trailingComma: 'es5',
  proseWrap: 'never',
  embeddedLanguageFormatting: 'off',
};

async function prettyMd(md) {
  return await prettier.format(md, { parser: 'markdown', ...prettierOptions });
}

async function prettyHtml(html) {
  const formatted = await prettier.format(html, { parser: 'html', ...prettierOptions });
  return formatted.replace(/(\n{2,})/gm, '\n');
}

module.exports = {
  prettyMd,
  prettyHtml,
};
