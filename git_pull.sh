#!/bin/bash
set -e

echo "🔄 Pulling main repo..."
git pull

echo "🔄 Updating submodules..."
git submodule update --init --recursive

echo "✅ Repo is up to date"