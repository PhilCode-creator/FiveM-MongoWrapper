// build.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  outfile: './dist/main.js',
  platform: 'node',
  target: 'es2020',
  external: [], // Add FiveM-native modules here if needed
  sourcemap: false,
  minify: false,
}).catch(() => process.exit(1));
