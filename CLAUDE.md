# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

react-dialog-mui is a React library that provides Promise-based wrappers around Material-UI dialogs, replacing manual dialog state management with async/await equivalents of browser-native alert, confirm, and prompt.

## Commands

- `npm run build` — Compile TypeScript to `build/` (CommonJS, ES6 target)
- `npm run test` — Run Vitest in watch mode
- `npm run citest` — Run Vitest once (CI mode)
- `npm run format` — Format with Prettier
- `npm run dev` — Start Storybook on port 6006

There is no lint command; formatting is handled solely by Prettier.

## Architecture

**Entry point:** `src/components/index.tsx` exports three items:
- `ActionDialogsContext` — Provider component that wraps the app and renders the dialog stack
- `useActionDialogs()` — Hook returning six dialog methods: `alert`, `confirm`, `prompt`, `choiceSingle`, `choiceMultiple`, `modal` (all return Promises)
- `useActionDialogRef()` — Hook returning a ref for programmatic modal dismissal

**State management:** `src/components/Store.ts` implements a minimal pub/sub store. The dialog stack is an array of `ActionDialog` union types. Dialogs are pushed onto the stack and the topmost one is rendered. Dismissal pops from the stack and resolves the Promise.

**Dialog components** (`src/components/`):
- `AlertDialog.tsx` — Handles both alert and confirm (shared component, `isConfirm` flag)
- `PromptDialog.tsx` — Text input with optional multiline, required validation, readonly
- `ChoiceDialog.tsx` — Exports `SingleChoiceDialog` (radio) and `MultipleChoiceDialog` (checkbox)
- `ModalDialog.tsx` — Generic modal accepting custom React content

**Type definitions:** `src/components/types.tsx` defines the `ActionDialog` discriminated union and all dialog input types.

**Tests:** `src/stories/*.test.tsx` — Tests use Vitest + React Testing Library with jsdom environment. Each dialog type has a corresponding test file alongside its Storybook example component.

## Formatting

Prettier config: 100 char width, 2-space indent, single quotes, trailing commas, LF line endings.
