export { printReport };

const printReport = (pages, baseUrl) => {
  console.log(
    "\n==========================================================================================="
  );
  console.log("\x1b[36m%s\x1b[0m", `Crawl Report for: ${baseUrl}`);
  console.log(
    "==========================================================================================="
  );

  // Find the maximum number length
  const maxKeyLength = Math.max(
    ...Object.keys(pages).map((page) => page.length)
  );

  for (const page in pages) {
    let pageWithColon = `${page}:`;
    const paddedPage = pageWithColon.padEnd(maxKeyLength + 1, " ");
    const paddedNumber = pages[page].toString().padStart(1, " ");
    console.log(`\x1b[32m${paddedPage}\x1b[0m \x1b[33m${paddedNumber}\x1b[0m`);
  }
  console.log(
    "==========================================================================================="
  );
};
