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

const crawlPage = async (url) => {
  const pageResponse = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "text/html",
    },
  });

  if (pageResponse.status >= 400) {
    console.log("There was an error retrieving the page");
    return;
  }
  console.log(pageResponse);
};
