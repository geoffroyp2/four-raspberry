const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@src": path.resolve(__dirname, "./src"),
    "@db": path.resolve(__dirname, "./src/network/db"),
    "@engine": path.resolve(__dirname, "./src/network/engine"),
    "@sharedTypes": path.resolve(__dirname, "./src/sharedTypes"),
    "@UIutils": path.resolve(__dirname, "./src/UI/utils"),
    "@UITabs": path.resolve(__dirname, "./src/UI/components/Tabs"),
    "@UIMain": path.resolve(__dirname, "./src/UI/components/Main"),
    "@UIGeneric": path.resolve(__dirname, "./src/UI/components/Generic"),
    "@redux": path.resolve(__dirname, "./src/redux/reducers"),
  })
);
