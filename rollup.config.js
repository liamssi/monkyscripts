import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import simplevars from "postcss-simple-vars";
import nested from "postcss-nested";
//import cssnext from "postcss-cssnext";
const postcssPresetEnv = require("postcss-preset-env");
import cssnano from "cssnano";
export default [
  {
    input: "src/facebook/index.ts",
    output: {
      file: "dist/fb/index.js",
      name: "fbtool",
      format: "iife",
      globals: { axios: "axios" },
    },
    plugins: [
      typescript(),
      postcss({
        extensions: [".css"],
        plugins: [
          simplevars(),
          nested(),
          postcssPresetEnv({ stage: 0 }),
          cssnano(),
        ],
        // extract: true,
        // Or with custom file name, it will generate file relative to bundle.js in v3
        //extract: "bundle.css",
      }),
    ],
  },
  {
    input: "src/aliexpress/index.ts",
    output: {
      //dir: "dist",
      file: "dist/ali/index.js",
      name: "alitools",
      format: "iife",
      globals: { axios: "axios", "p-queue": "pqueue" },
    },
    plugins: [
      typescript(),
      postcss({
        extensions: [".css"],
        plugins: [
          simplevars(),
          nested(),
          postcssPresetEnv({ stage: 0 }),
          cssnano(),
        ],
        //extract: true,
        // Or with custom file name, it will generate file relative to bundle.js in v3
        //extract: "bundle.css",
      }),
    ],
  },
];
