# ESLint and Husky Configuration for AWEMA 2030

This document describes the linting and pre-commit hook setup for the AWEMA 2030 monorepo.

## Overview

The project uses:
- **ESLint 9** with flat config format for JavaScript/TypeScript linting
- **Prettier** for code formatting
- **Husky** for Git hooks
- **lint-staged** for running linters on staged files
- **Turborepo** integration for efficient linting across workspaces

## ESLint Configuration

### Main Configuration File

The ESLint configuration is in `eslint.config.mjs` using the new flat config format. It includes:

- TypeScript support via `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin`
- React and React Hooks linting
- JSX accessibility checks
- Import order enforcement
- Prettier integration
- Turborepo configuration support

### Key Rules

1. **TypeScript Rules**
   - Type-safe rules enabled
   - Consistent type imports enforced
   - Unused variables must be prefixed with `_`

2. **React Rules**
   - Arrow functions required for components
   - React import not required (Next.js)
   - PropTypes disabled (using TypeScript)

3. **Import Rules**
   - Organized import order
   - Alphabetical sorting within groups
   - Newlines between import groups

4. **Code Style**
   - Prettier handles formatting
   - Prefer const/template literals
   - Object shorthand syntax

## Running ESLint

### Available Commands

```bash
# Run linting across all workspaces
pnpm lint

# Run linting with auto-fix
pnpm lint:fix

# Lint only the root workspace
pnpm lint:root

# Lint and fix the root workspace
pnpm lint:root:fix

# Format all files with Prettier
pnpm format

# Check formatting without changing files
pnpm format:check
```

### Workspace-specific Linting

Each workspace (apps/packages/tools) has its own lint script that can be run individually:

```bash
# Example: lint only the studio app
cd apps/studio && pnpm lint
```

## Husky and Pre-commit Hooks

### Setup

Due to the Git repository being in the parent directory, use the setup script:

```bash
# Run from the awema2 directory
./scripts/setup-husky.sh
```

This will:
1. Navigate to the parent directory
2. Initialize Husky
3. Create a pre-commit hook
4. Configure it to run lint-staged on the awema2 directory

### Manual Setup (if needed)

If the script doesn't work, manually create `.husky/pre-commit` in the parent directory:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

cd awema2 && npx lint-staged
```

### lint-staged Configuration

The `.lintstagedrc.json` file configures which commands run on staged files:

```json
{
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md,yml,yaml,css,scss,sass,less,html}": [
    "prettier --write"
  ]
}
```

## Troubleshooting

### ESLint Not Finding Files

If ESLint isn't finding your files, ensure:
1. The file extensions match the configuration
2. The files aren't in ignored directories
3. You're running ESLint from the correct directory

### Husky Not Running

If pre-commit hooks aren't running:
1. Ensure Git hooks are enabled: `git config core.hooksPath .husky`
2. Check that the hook files are executable: `chmod +x .husky/pre-commit`
3. Verify the .git directory location

### Import Resolution Issues

If you get import resolution errors:
1. Ensure `eslint-import-resolver-typescript` is installed
2. Check that tsconfig paths are correctly configured
3. Verify workspace dependencies are installed

## IDE Integration

### VS Code

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

### WebStorm/IntelliJ

1. Enable ESLint: Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint
2. Select "Automatic ESLint configuration"
3. Enable "Run eslint --fix on save"

## Best Practices

1. **Run linting before committing**: The pre-commit hook handles this automatically
2. **Fix linting errors immediately**: Don't let them accumulate
3. **Use auto-fix when possible**: `pnpm lint:fix` can fix many issues automatically
4. **Keep dependencies updated**: Regularly update ESLint and plugins
5. **Test configuration changes**: Ensure new rules don't break existing code

## Adding New Rules

To add or modify ESLint rules:

1. Edit `eslint.config.mjs`
2. Test the changes: `pnpm lint:root`
3. Fix any new violations
4. Commit the changes

Remember that rules apply to all workspaces, so changes affect the entire monorepo.