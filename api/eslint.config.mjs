import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: 2023,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "max-len": ["error", 130],
      "indent": ["error", 2],
      "new-cap": 0,
      "object-curly-spacing": ["error", "always"],
      "no-undef": "off",
      "no-process-env": "off",
    },
  },
];