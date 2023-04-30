function printReport(pages) {
  console.log('==================');
  console.log('Report');
  console.log('==================');
  const sorted = sortPages(pages);
  sorted.forEach(page =>
    console.log(`Found ${page[1]} internal links to ${page[0]}`)
  );
}

function sortPages(pages) {
  let pagesArray = [];
  for (const page in pages) {
    pagesArray.push([page, pages[page]]);
  }
  return pagesArray.sort((a, b) => b[1] - a[1]);
}

module.exports = {
  printReport,
  sortPages,
};
