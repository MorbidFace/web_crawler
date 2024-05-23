import { argv } from "node:process";
import { crawlPage } from "./crawl.js";

// console.log(argv[2])

async function main() {
  if (argv.length < 3) {
    console.log("Need to specify a url as an argument.");
    return;
  } else if (argv.length > 3) {
    console.log("Too many arguments");
    return;
  }

  const baseUrl = argv[2];
  console.log(`Crawling at the base: ${baseUrl}...`);
  const pages = await crawlPage(baseUrl);
  console.log(pages)
  return
}

await main();
