#!/bin/sh
rm -rf coverage/*
deno test \
  --import-map import-map.json \
  --coverage=coverage/profile
deno coverage coverage/profile \
  --exclude=src/testing.ts \
  --lcov > coverage/lcov.info