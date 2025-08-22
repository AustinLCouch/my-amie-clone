#!/usr/bin/env bash
# Fetch MonoLisa font binaries from a private location during CI.
# This script intentionally reads from environment variables and does not echo secrets.
# Expected environment variables (examples):
#   MONOLISA_SOURCE="s3://my-private-bucket/monolisa/2025.8.21"
# or MONOLISA_SOURCE can be a private HTTPS URL prefix that requires auth via curl headers.
#
# For AWS S3, you must have AWS credentials present in the environment (e.g., GitHub Actions OIDC or secrets).
# For HTTPS, define MONOLISA_CURL_HEADER (e.g., "Authorization: Bearer $TOKEN").
set -euo pipefail

ROOT_DIR="$(dirname "$(dirname "${BASH_SOURCE[0]}")")"
TARGET_DIR="$ROOT_DIR/src/app/fonts/monolisa/monolisa-webfont-2025.8.21/woff2"
mkdir -p "$TARGET_DIR"

if [[ -z "${MONOLISA_SOURCE:-}" ]]; then
  echo "MONOLISA_SOURCE is not set. Set it to a private bucket or URL prefix." >&2
  exit 1
fi

# Files we expect to fetch (minimal set used by the app). Adjust if you want other variants.
FILES=(
  "0-normal.woff2"
  "1-italic.woff2"
)

fetch_s3() {
  if ! command -v aws >/dev/null 2>&1; then
    echo "aws CLI not found. Install or switch to HTTPS mode." >&2
    exit 1
  fi
  for f in "${FILES[@]}"; do
    aws s3 cp "${MONOLISA_SOURCE%/}/$f" "$TARGET_DIR/$f"
  done
}

fetch_https() {
  for f in "${FILES[@]}"; do
    if [[ -n "${MONOLISA_CURL_HEADER:-}" ]]; then
      curl -fsS -H "$MONOLISA_CURL_HEADER" -o "$TARGET_DIR/$f" "${MONOLISA_SOURCE%/}/$f"
    else
      curl -fsS -o "$TARGET_DIR/$f" "${MONOLISA_SOURCE%/}/$f"
    fi
  done
}

if [[ "$MONOLISA_SOURCE" == s3://* ]]; then
  fetch_s3
else
  fetch_https
fi

echo "Fetched MonoLisa fonts into $TARGET_DIR"

