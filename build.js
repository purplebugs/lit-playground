import rollupPluginCommonjs from "@rollup/plugin-commonjs";
import rollupPluginResolve from "@rollup/plugin-node-resolve";
import rollupPluginReplace from "@rollup/plugin-replace";
import rollupPluginTerser from "@rollup/plugin-terser";
import { rollup } from "rollup";

const inputOptions = {
  input: ["./src/alpaca-map.js"],
  plugins: [
    rollupPluginResolve({ preferBuiltins: true }),
    rollupPluginCommonjs({ include: /node_modules/ }),
    rollupPluginReplace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true,
    }),
    rollupPluginTerser({ format: { comments: false } }),
  ],
};

const outputOptionsList = [
  {
    // preserveModules: true,
    // dir: './public/build',
    file: "./public/build/alpaca-map.js",
    format: "es",
    sourcemap: true,
  },
];

let bundle = await rollup(inputOptions);

for (const outputOptions of outputOptionsList) {
  await bundle.write(outputOptions);
}

if (bundle) {
  await bundle.close();
}
