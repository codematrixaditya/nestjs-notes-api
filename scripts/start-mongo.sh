#!/bin/sh
set -e

if ! docker info >/dev/null 2>&1; then
  echo "Docker is not available. Please start Docker Desktop and try again."
  exit 1
fi

docker compose up -d --build mongodb
