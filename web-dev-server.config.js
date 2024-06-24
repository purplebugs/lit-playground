import { esbuildPlugin } from "@web/dev-server-esbuild";

export default {
  open: false,
  debug: true,
  nodeResolve: true,
  plugins: [
    esbuildPlugin({
      target: "esnext",
      loaders: { ".js": "ts" },
    }),
  ],
};
