import fs from "fs";
import _ from "lodash";
import path from "path";

export function isTheme(directory) {
  const requiredFiles = [
    "layout/theme.liquid",
    "templates/product.liquid",
    "templates/index.liquid",
    "templates/page.liquid",
    "templates/collection.liquid",
    "templates/cart.liquid",
    "templates/blog.liquid",
    "templates/article.liquid",
    "templates/search.liquid"
  ];

  const directoryFiles = fs.readdirSync(directory);
  const missingFiles = _.difference(requiredFiles, directoryFiles);
  if (missingFiles.length > 0) {
    return false;
  } else {
    return true;
  }
}

export function hasContentTags(directory) {
  const themePath = path.join(directory, "layout/theme.liquid");
  const themeFile = fs.readFileSync(themePath, "utf8");
  const regex = [/{{\s?content_for_layout\s?}}/, /{{\s?content_for_head\s?}}/];
  const matches = regex.map(pattern => {
    return themeFile.match(pattern);
  });

  if (matches.includes(null)) {
    return false;
  } else {
    return true;
  }
}

export function isValid(directory) {
  if (isTheme(directory) && hasContentTags(directory)) {
    return true;
  } else {
    return false;
  }
}
