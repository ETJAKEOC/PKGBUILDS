#!/bin/expect
set timeout 600
spawn ./mach bootstrap
expect "Please choose the version of Firefox you want to build"
send "2\r"
expect "Would you like to run a configuration wizard"
send "n\r"
expect "Will you be submitting commits to Mozilla"
send "n\r"
expect "Would you like to enable build system telemetry"
send "n\r"
expect eof
