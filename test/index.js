import mock from "mock-fs";
import { isTheme, hasContentTags } from "./../src/index";
import expect from "expect";

describe("Theme validation library", () => {

  describe("isTheme", () => {

    it("should return true if all required files are present", () => {
      const themeStructure = {
        "/theme": {
          "layout/theme.liquid": {},
          "templates/product.liquid": {},
          "templates/index.liquid": {},
          "templates/page.liquid": {},
          "templates/collection.liquid": {},
          "templates/cart.liquid": {},
          "templates/blog.liquid": {},
          "templates/article.liquid": {},
          "templates/search.liquid": {}
        }
      };
      mock(themeStructure);
      expect(isTheme("/theme")).toBe(true);
    });

    it("should return false if any required file is not present", () => {
      // missing search.liquid
      const themeStructure = {
        "/theme": {
          "layout/theme.liquid": {},
          "templates/product.liquid": {},
          "templates/index.liquid": {},
          "templates/page.liquid": {},
          "templates/collection.liquid": {},
          "templates/cart.liquid": {},
          "templates/blog.liquid": {},
          "templates/article.liquid": {}
        }
      };
      mock(themeStructure);
      expect(isTheme("/theme")).toBe(false);
    });
  });

  describe("hasContentTags", () => {

    it("should return true if theme has required liquid tags", () => {
      const themeHTML = `
        <div>{{ content_for_layout }}</div>
        <div>{{ content_for_head }}</div>
      `;
      mock({"/theme/layout/theme.liquid": themeHTML});
      expect(hasContentTags("/theme")).toBe(true);
    });

    it("should return false if theme does not have required liquid tags", () => {
      const themeHTML = "<div></div>";
      mock({"/theme/layout/theme.liquid": themeHTML });
      expect(hasContentTags("/theme")).toBe(false);
    });

    it("should return false if theme only has 1 tag", () => {
      const themeStructure = {
        "/theme/layout/theme.liquid": "<div>{{ content_for_head }}</div>"
      };
      mock(themeStructure);
      expect(hasContentTags("/theme")).toBe(false);
    });
  });
});
