// Code required to use ES6 and Async/Await in Node with Node/Babel
require("@babel/register")({
  presets: ["@babel/preset-env"]
});
require("babel-polyfill");

module.exports = require('./src/index.js');