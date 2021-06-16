import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import simplevars from "postcss-simple-vars";
import nested from "postcss-nested";
import cssnext from "postcss-cssnext";
import cssnano from "cssnano";
export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    name: "fbtool",
    format: "iife",
  },
  plugins: [
    typescript(),
    postcss({
      extensions: [".css"],
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false }),
        cssnano(),
      ],
      extract: true,
      // Or with custom file name, it will generate file relative to bundle.js in v3
      extract: "bundle.css",
    }),
  ],
};