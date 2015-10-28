"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTheme = isTheme;
exports.hasContentTags = hasContentTags;
exports.isValid = isValid;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function isTheme(directory) {
  var requiredFiles = ["layout/theme.liquid", "templates/product.liquid", "templates/index.liquid", "templates/page.liquid", "templates/collection.liquid", "templates/cart.liquid", "templates/blog.liquid", "templates/article.liquid", "templates/search.liquid"];

  var directoryFiles = _fs2["default"].readdirSync(directory);
  var missingFiles = _lodash2["default"].difference(requiredFiles, directoryFiles);
  if (missingFiles.length > 0) {
    return false;
  } else {
    return true;
  }
}

function hasContentTags(directory) {
  var themePath = _path2["default"].join(directory, "layout/theme.liquid");
  var themeFile = _fs2["default"].readFileSync(themePath, "utf8");
  var regex = [/{{\s?content_for_layout\s?}}/, /{{\s?content_for_head\s?}}/];
  var matches = regex.map(function (pattern) {
    return themeFile.match(pattern);
  });

  if (matches.includes(null)) {
    return false;
  } else {
    return true;
  }
}

function isValid(directory) {
  if (isTheme(directory) && hasContentTags(directory)) {
    return true;
  } else {
    return false;
  }
}