import rollupPluginCommonjs from "@rollup/plugin-commonjs";
import rollupPluginResolve from "@rollup/plugin-node-resolve";
import rollupPluginReplace from "@rollup/plugin-replace";
import { rollup } from "rollup";

const inputOptions = {
  input: ["./src/alpaca-map.js"],
  external: ['lit'],
  plugins: [
    rollupPluginResolve({ 
      preferBuiltins: true 
    }),
    rollupPluginCommonjs({ 
      include: /node_modules/ 
    }),
    rollupPluginReplace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true,
    }),
  ],
};

const outputOptionsList = [
  {
    preserveModules: true,
    entryFileNames: '[name].mjs',
    dir: './build/node',
    format: "es",
    interop: 'esModule',
  },
];

let bundle = await rollup(inputOptions);

for (const outputOptions of outputOptionsList) {
  await bundle.write(outputOptions);
}

if (bundle) {
  await bundle.close();
}
