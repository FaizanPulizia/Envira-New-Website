// @ts-check
import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import astroPlugin from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

const sharedRules = {
  // Handle unused variables in Astro components
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      caughtErrorsIgnorePattern: "^_",
    },
  ],

  // Import rules for Astro files
  "import/order": [
    "error",
    {
      groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
      "newlines-between": "always",
      alphabetize: {
        order: "asc",
        caseInsensitive: true,
      },
      pathGroups: [
        {
          pattern: "@/**",
          group: "internal",
          position: "before",
        },
      ],
      pathGroupsExcludedImportTypes: ["builtin"],
    },
  ],
  "import/no-unused-modules": "error",
  "import/no-duplicates": "error",

  // TypeScript specific rules for Astro frontmatter
  "@typescript-eslint/consistent-type-imports": [
    "error",
    {
      prefer: "type-imports",
      fixStyle: "inline-type-imports",
      disallowTypeAnnotations: false,
    },
  ],
  "@typescript-eslint/no-explicit-any": "warn",

  // Code quality rules
  "no-console": "warn",
  "no-debugger": "error",
  "prefer-const": "error",
  "no-var": "error",
  "object-shorthand": "error",
  "prefer-template": "error",
};

export default [
  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,

  // Astro recommended configuration (this includes parser setup)
  ...astroPlugin.configs.recommended,

  // Prettier integration (disables conflicting ESLint rules)
  prettierConfig,

  {
    // Global settings for all files
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
  },

  {
    // TypeScript and JavaScript files
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: sharedRules,
  },

  {
    // Override rules specifically for Astro files
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: sharedRules,
  },

  {
    // Ignore common directories
    ignores: ["dist/", "node_modules/", ".astro/"],
  },
];
