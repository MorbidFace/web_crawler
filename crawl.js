export { normalizeUrl, getUrlsFromHtml, crawlPage };
import { JSDOM } from "jsdom";

const normalizeUrl = (url) => {
  const urlObject = new URL(url);
  const domain = urlObject.host;
  let path = urlObject.pathname;
  if (path[path.length - 1] === "/") {
    path = path.slice(0, path.length - 1);
  }
  const normalized = `${domain}${path}`;
  return normalized;
};

const getUrlsFromHtml = (htmlBody, baseUrl) => {
  const dom = new JSDOM(htmlBody);
  const anchorList = dom.window.document.querySelectorAll("a");
  let urls = [];
  for (const anchor of anchorList) {
    if (anchor.hasAttribute("href")) {
      try {
        const urlObject = new URL(anchor.href, baseUrl).href;
        urls.push(urlObject);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  return urls;
};

const crawlPage = async (baseUrl, currentUrl = baseUrl, pages = {}) => {
  const baseUrlObject = new URL(baseUrl);
  const currentUrlObject = new URL(currentUrl);

  if (baseUrlObject.host != currentUrlObject.host) {
    return pages;
  }
  const normalised = normalizeUrl(currentUrl);

  if (pages[normalised] != undefined) {
    pages[normalised]++;
    return pages;
  } else {
    pages[normalised] = 1;
  }

  console.log(`currently crawling: ${normalised}...`)
  let html;
  try {
    html = await fetchHtml(currentUrl);
  } catch (error) {
    console.log(
      `Failed to fetch html for ${normalised} with error: ${error.message}`
    );
  }
  if (html != undefined) {
    const urls = getUrlsFromHtml(html, baseUrl);
    for (const url of urls) {
      pages = await crawlPage(baseUrl, url, pages);
    }
  }

  return pages;
};

const fetchHtml = async (url) => {
  let pageResponse;
  try {
    pageResponse = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    throw new Error(`Network error: ${error.message}`);
  }

  if (pageResponse.status >= 400) {
    console.log("There was an error retrieving the page");
    return;
  }

  const contentType = pageResponse.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    console.log(`response is non-html: ${contentType}`);
    return;
  }

  return await pageResponse.text();
};
