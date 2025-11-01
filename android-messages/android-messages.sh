#!/bin/bash
export ELECTRON_DISABLE_SECURITY_WARNINGS=true

exec /usr/bin/electron /opt/android-messages/app.asar "$@"
