#!/bin/bash

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Export to static HTML
echo "Exporting to static HTML..."
npm run export

# Copy static files
echo "Copying admin files..."
cp -R public/admin/index.html out/admin/
cp -R public/admin/config.yml out/admin/
cp public/_redirects out/
cp public/admin.html out/

echo "Build completed successfully!" 