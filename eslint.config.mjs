import globals from "globals";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";
import { rules } from "eslint-plugin-react/configs/all";


export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {languageOptions: { globals: globals.browser }},
  ...fixupConfigRules(pluginReactConfig),
  {
    "rules": {
      "no-unused-vars": ["warn"]
    }
  }
];