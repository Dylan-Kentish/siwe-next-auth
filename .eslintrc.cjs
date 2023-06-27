// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import('eslint').Linter.Config} */

const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },
  plugins: ["@typescript-eslint", "import", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    'plugin:prettier/recommended',
  ],
};

module.exports = config;
