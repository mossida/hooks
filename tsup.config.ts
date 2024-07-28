import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true,
  outDir: "dist",
  clean: true,
  format: ["cjs", "esm"],
  minify: true,
  treeshake: true,
  splitting: false,
  cjsInterop: true,
});
