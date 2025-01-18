#!/bin/bash
AUR_DIR="$PWD"
for dir in "$AUR_DIR"/*; do
	if [[ -d "$dir" ]]; then
		echo "Entering directory: $dir"
		cd "$dir" || { echo "Failed to enter $dir"; continue; }
		echo "Building package in $dir..."
		makepkg -s || { echo "Failed to build package in $dir"; continue; }
		echo "Successfully built package in $dir."
	fi
done
echo "All packages have been processed."
