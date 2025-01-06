#!/bin/bash
AUR_DIR="$PWD"
for dir in "$AUR_DIR"/*; do
	if [[ -d "$dir" ]]; then
		echo "Entering directory: $dir"
		cd "$dir" || { echo "Failed to enter $dir"; continue; }
		echo "Building package in $dir..."
		mkdir src
		sudo mount -t tmpfs tmpfs src
		sudo chown jake:jake src
		makepkg -s || { echo "Failed to build package in $dir"; continue; }
		sudo umount -fl src
		echo "Successfully built package in $dir."
	fi
done
echo "All packages have been processed. You can now install them with yay -U *.pkg.tar.*"
