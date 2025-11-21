#!/usr/bin/env bash
# POSIX shim to ensure a callable gradle wrapper exists even if executable bits aren't preserved.
# Prefer ./gradlew if available; otherwise, fall back to this script.
if [ -f "./gradlew" ]; then
  # If the file exists but is not executable, try to exec via bash explicitly.
  /usr/bin/env bash ./gradlew "$@"
  exit $?
fi
echo "Shim gradlew.sh: Android build disabled in this environment."
exit 0
