import path from "node:path";
import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import turboPlugin from "eslint-plugin-turbo";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export const restrictEnvAccess = defineConfig(
  { ignores: ["**/env.ts", "**/env.js"] },
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    rules: {
      "no-restricted-properties": [
        "error",
        {
          object: "Bun",
          property: "env",
          message:
            "Use `import { env } from '@/env'` instead to ensure validated types.",
        },
        {
          object: "process",
          property: "env",
          message:
            "Use `import { env } from '@/env'` instead to ensure validated types.",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "bun",
              importNames: ["env"],
              message:
                "Use `import { env } from '@/env'` instead to ensure validated types.",
            },
            {
              name: "process",
              importNames: ["env"],
              message:
                "Use `import { env } from '@/env'` instead to ensure validated types.",
            },
          ],
        },
      ],
    },
  },
);

export const config = defineConfig(
  includeIgnoreFile(path.join(import.meta.dirname, "../../.gitignore")),
  { ignores: ["**/*.config.*", "dist/**"] },
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    plugins: {
      import: importPlugin,
      turbo: turboPlugin,
    },
    extends: [
      js.configs.recommended,
      eslintConfigPrettier,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...restrictEnvAccess,
    ],
    rules: {
      ...turboPlugin.configs.recommended.rules,
      "turbo/no-undeclared-env-vars": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-restricted-imports": [
        "error",
        {
          name: "zod",
          message: "Use `import { z } from 'zod/v4'` instead to ensure v4.",
        },
      ],
    },
  },
  {
    linterOptions: { reportUnusedDisableDirectives: true },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);

// export const configx = [
//   js.configs.recommended,
//   eslintConfigPrettier,
//   ...tseslint.configs.recommended,
//   {
//     plugins: {
//       turbo: turboPlugin,
//     },
//     rules: {
//       "turbo/no-undeclared-env-vars": "warn",
//       // "no-restricted-properties": [
//       //   "error",
//       //   {
//       //     object: "process",
//       //     property: "env",
//       //     message:
//       //       "Use `import { env } from '@/env'` instead to ensure validated types.",
//       //   },
//       // ],
//       "no-restricted-imports": [
//         "error",
//         {
//           name: "process",
//           importNames: ["env"],
//           message:
//             "Use `import { env } from '@/env'` instead to ensure validated types.",
//         },
//         {
//           name: "Bun",
//           importNames: ["env"],
//           message:
//             "Use `import { env } from '@/env'` instead to ensure validated types.",
//         },
//         {
//           name: "zod",
//           message: "Use `import { z } from 'zod/v4'` instead to ensure v4.",
//         },
//       ],
//     },
//   },
//   {
//     plugins: {},
//   },
//   {
//     ignores: ["dist/**"],
//   },
// ];
