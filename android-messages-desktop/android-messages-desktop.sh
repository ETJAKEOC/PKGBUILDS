#!/bin/bash
export ELECTRON_DISABLE_SECURITY_WARNINGS=true

exec /usr/bin/electron \
  --force-device-scale-factor=1.77 \
  --enable-features=UseOzonePlatform \
  --ozone-platform=wayland \
  --enable-zero-copy \
  --enable-gpu-rasterization \
  --enable-native-gpu-memory-buffers \
  --ignore-gpu-blocklist \
  --disable-features=OutOfBlinkCors \
  --no-sandbox \
  --disable-breakpad \
  --enable-unsafe-webgpu \
  /usr/lib/android-messages-desktop/resources/app.asar "$@"
