#!/bin/bash

exec electron \
  --enable-features=VaapiVideoDecoder \
  --ignore-gpu-blacklist \
  --enable-zero-copy \
  --enable-gpu-rasterization \
  --enable-oop-rasterization \
  --disable-background-networking \
  --disable-renderer-backgrounding \
  /opt/everycircuit/app.asar
