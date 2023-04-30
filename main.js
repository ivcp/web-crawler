const { crawlPage } = require('./crawl.js');

async function main() {
  if (process.argv.length === 3) {
    console.log(`Crawler starting at base URL ${process.argv[2]}`);
    const pages = await crawlPage(process.argv[2], process.argv[2], {});
    console.log(pages);
  } else {
    console.error('Error. Try again');
    return;
  }
}

main();
