import { test, expect } from "@jest/globals";
import { normalizeUrl, getUrlsFromHtml } from "./crawl";

test('Normalize "https://blog.boot.dev/path/" - expected: "blog.boot.dev/path"', () => {
  expect(normalizeUrl("https://blog.boot.dev/path/")).toBe(
    "blog.boot.dev/path"
  );
});

test('Normalize "https://blog.boot.dev/path" - expected: "blog.boot.dev/path"', () => {
  expect(normalizeUrl("https://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});

test('Normalize "http://blog.boot.dev/path/" - expected: "blog.boot.dev/path"', () => {
  expect(normalizeUrl("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
});

test('Normalize "http://blog.boot.dev/path" - expected: "blog.boot.dev/path"', () => {
  expect(normalizeUrl("http://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});

test("Get Urls from html - 0 urls", () => {
  expect(
    getUrlsFromHtml(
      '<body><div id="boot"></div></body>',
      "http://blog.boot.dev"
    )
  ).toEqual([]);
});
test("Get Urls from html - 1 urls", () => {
  expect(
    getUrlsFromHtml(
      '<body><div id="boot"></div><a href="/path1">Learn Backend Development</a>',
      "http://blog.boot.dev"
    )
  ).toEqual(["http://blog.boot.dev/path1"]);
});
test("Get Urls from html - 2 urls", () => {
  expect(
    getUrlsFromHtml(
      '<body><div id="boot"></div><a href="/path1">Learn Backend Development</a><a href="/path2">Learn Backend Development</a>',
      "http://blog.boot.dev"
    )
  ).toEqual(["http://blog.boot.dev/path1", "http://blog.boot.dev/path2"]);
});
test("Get Urls from html - 3 urls", () => {
  expect(
    getUrlsFromHtml(
      '<body><div id="boot"></div><a href="/path1">Learn Backend Development</a><a href="/path2">Learn Backend Development</a><a href="http://blog.boot.dev">Learn Backend Development</a></body>',
      "http://blog.boot.dev"
    )
  ).toEqual([
    "http://blog.boot.dev/path1",
    "http://blog.boot.dev/path2",
    "http://blog.boot.dev/",
  ]);
});
