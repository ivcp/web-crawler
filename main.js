const { crawlPage } = require('./crawl.js');

async function main() {
  if (process.argv.length === 3) {
    console.log(`Crawler starting at base URL ${process.argv[2]}`);
    await crawlPage(process.argv[2]);
  } else {
    console.error('Error. Try again');
    return;
  }
}

main();
