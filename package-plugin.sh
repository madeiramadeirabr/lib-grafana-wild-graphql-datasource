#!/usr/bin/env bash

set -e

mage -v
npm run build

PLUGIN_ID="madeiramadeira-wildgraphql-datasource"
PACKAGE_DIR="package"
ZIP_NAME="$PACKAGE_DIR/$PLUGIN_ID.zip"

# Clean up any previous package
rm -rf "$PACKAGE_DIR"

# Create the package directory
mkdir -p "$PACKAGE_DIR"

# Create a temporary directory for the plugin inside package
TEMP_DIR="$PACKAGE_DIR/temp_plugin_dir"
PLUGIN_DIR="$TEMP_DIR/$PLUGIN_ID"
mkdir -p "$PLUGIN_DIR"

# Copy necessary files and directories
cp -r dist/* "$PLUGIN_DIR/"

# Create the zip
cd "$TEMP_DIR"
zip -r "../$PLUGIN_ID.zip" "$PLUGIN_ID"

# Clean up
cd ../..
rm -rf "$TEMP_DIR"

echo "Packaged plugin as $ZIP_NAME"
