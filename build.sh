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

# Copy content directories for CMS data
echo "Copying content directories..."
mkdir -p out/content/artwork out/content/pages
cp -R content/artwork out/content/
cp -R content/pages out/content/
cp -R public/images out/

echo "Build completed successfully!" 