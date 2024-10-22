import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import {fileURLToPath} from 'url';
import path from "path";


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default [
  { ignores: ["node_modules", "dist"] },
  {
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.amd,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-prototype-builtins': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },

  },
];
