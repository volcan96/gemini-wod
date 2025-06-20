import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";


export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { ...pluginReactConfig, rules: { ...pluginReactConfig.rules, "react/react-in-jsx-scope": "off", "react/jsx-uses-react": "off" } },
  { files: ["**/*.{js,jsx,ts,tsx}"], plugins: { "react-refresh": reactRefresh, "react-hooks": reactHooks }, rules: { "react-refresh/only-export-components": "warn", "react-hooks/rules-of-hooks": "error", "react-hooks/exhaustive-deps": "warn" } }
];
