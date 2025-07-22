#!/bin/bash

# clean old build
rm -rf .next

# rebuild
npm run build
# → you should see ✓ Compiled successfully (no “not a module” or “Variants” errors)

# then start
HOST=0.0.0.0 npm run start
