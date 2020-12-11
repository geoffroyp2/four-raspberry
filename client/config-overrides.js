const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@src": path.resolve(__dirname, "./src"),
    "@db": path.resolve(__dirname, "./src/network/db"),
    "@engine": path.resolve(__dirname, "./src/network/engine"),
    "@clientTypes": path.resolve(__dirname, "./src/types"),
    "@redux": path.resolve(__dirname, "./src/redux/reducers"),
    "@UIutils": path.resolve(__dirname, "./src/UI/utils"),
    "@UIRun": path.resolve(__dirname, "./src/UI/components/ProgramRun"),
    "@UIBrowser": path.resolve(__dirname, "./src/UI/components/Browser"),
    "@sharedTypes": path.resolve(__dirname, "./src/sharedTypes"),
  })
);
