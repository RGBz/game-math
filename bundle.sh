deno bundle \
  --config deno.json \
  --import-map import-map.json \
  --unstable \
  src/visualizer.ts public/index.js