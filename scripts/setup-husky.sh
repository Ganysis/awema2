#!/bin/bash

# This script sets up Husky hooks for the AWEMA 2030 monorepo
# Since the .git directory is in the parent folder, we need to configure it properly

echo "Setting up Husky for AWEMA 2030..."

# Navigate to the parent directory where .git is located
cd ..

# Install Husky
npx husky init

# Create pre-commit hook
cat > .husky/pre-commit << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Change to awema2 directory and run lint-staged
cd awema2 && npx lint-staged
EOF

# Make the hook executable
chmod +x .husky/pre-commit

echo "Husky setup completed!"
echo "Pre-commit hook will run lint-staged on staged files in the awema2 directory."