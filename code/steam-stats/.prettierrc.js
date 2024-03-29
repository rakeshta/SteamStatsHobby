/** @type {import("prettier").Config} */
const config = {
  tabWidth: 2,
  printWidth: 120,
  singleQuote: true,
  jsxSingleQuote: true,
  experimentalTernaries: true,

  importOrder: ['^next$', '^next/(.*)$', '<THIRD_PARTY_MODULES>', '^@models/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  plugins: ['@trivago/prettier-plugin-sort-imports'],
};

module.exports = config;
