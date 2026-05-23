import next from "@next/eslint-plugin-next";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";

export default [
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: { jsx: true }
            }
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            "simple-import-sort": simpleImportSort,
            "react-hooks": reactHooks
        },
        rules: {
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",

            // React hooks rules
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn"
        }
    },

    next.configs["core-web-vitals"],

    {
        ignores: [
            ".next/**",
            "node_modules/**",
            "out/**",
            "build/**",
            "next-env.d.ts",
        ]
    }
];