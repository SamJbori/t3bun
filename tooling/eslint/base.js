import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      // "no-restricted-properties": [
      //   "error",
      //   {
      //     object: "process",
      //     property: "env",
      //     message:
      //       "Use `import { env } from '@/env'` instead to ensure validated types.",
      //   },
      // ],
      "no-restricted-imports": [
        "error",
        {
          name: "process",
          importNames: ["env"],
          message:
            "Use `import { env } from '@/env'` instead to ensure validated types.",
        },
        {
          name: "Bun",
          importNames: ["env"],
          message:
            "Use `import { env } from '@/env'` instead to ensure validated types.",
        },
        {
          name: "zod",
          message: "Use `import { z } from 'zod/v4'` instead to ensure v4.",
        },
      ],
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
];
