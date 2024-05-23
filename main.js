import { argv } from "node:process";
import { crawlPage } from "./crawl";

// console.log(argv[2])

function main() {
  if (argv.length < 3) {
    console.log("Need to specify a url as an argument.");
    return;
  } else if (argv.length > 3) {
    console.log("Too many arguments");
    return;
  }

  const baseUrl = argv[2];
  console.log(`Crawling at the base: ${baseUrl}...`);
  crawlPage(baseUrl);
}

main();
