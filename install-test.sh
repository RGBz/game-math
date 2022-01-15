#!/bin/sh

deno cache \
  --import-map import-map.json \
  src/*.test.ts 
