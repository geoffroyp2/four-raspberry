const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@src": path.resolve(__dirname, "./src"),
    "@network": path.resolve(__dirname, "./src/network"),
    "@baseTypes": path.resolve(__dirname, "./src/types"),
    "@utils": path.resolve(__dirname, "./src/utils"),
    "@components": path.resolve(__dirname, "./src/components"),
    "@editor": path.resolve(__dirname, "./src/app/editor/"),
    "@navBar": path.resolve(__dirname, "./src/app/navBar/"),
    "@app": path.resolve(__dirname, "./src/app"),
  })
);
