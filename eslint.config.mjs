import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const compat = new FlatCompat({
  baseDirectory: dirname,
  recommendedConfig: pluginJs.configs.recommended,
  allConfig: pluginJs.configs.all,
});

// Clean up globals
const cleanGlobals = Object.fromEntries(
  Object.entries(globals.browser)
    .map(([key, value]) => [
      key.trim(),
      value,
    ])
    .concat(
      Object.entries(globals.node).map(([key, value]) => [
        key.trim(),
        value,
      ])
    )
);

export default [
  ...compat.extends("airbnb-base", "prettier"),
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    // ignore the test files
    languageOptions: {
      globals: cleanGlobals,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      "import/no-unresolved": "off", // Disable the import/no-unresolved rule
      "import/extensions": [
        "off", // Change this to "off" to ignore the extension rule
        "ignorePackages",
        {
          "js": "never",
          "jsx": "never",
          "ts": "never",
          "tsx": "never",
        },
      ],
    },
  },
  {
    files: ["**/route.ts"], // Match all "route.ts" files in any folder
    rules: {
      "import/prefer-default-export": "off",
    },
  },
  {
    rules: {
      "react/prop-types": "off",
    }
  },
  {
    files: ["shared/services/**/*", "shared/Oauth/**/*"],
    rules: {
      "class-methods-use-this": "off",
    },
  },
  {
    files: ["shared/models/**/*"],
    rules: {
      "import/prefer-default-export": "off",
    },
  }
];
