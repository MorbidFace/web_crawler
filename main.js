import { argv } from "node:process";
import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

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
  console.log("\x1b[33m%s\x1b[0m", `Crawling at the base: ${baseUrl}...\n`);
  const pages = await crawlPage(baseUrl);
  console.log("\x1b[32m%s\x1b[0m", `\nCrawling complete...`);
  printReport(pages, baseUrl);
  return;
}

await main();
