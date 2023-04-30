const jsdom = require('jsdom');
const { JSDOM } = jsdom;

function normalizeURL(url) {
  const newUrl = new URL(url);
  let path = newUrl.pathname;
  if (path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return `${newUrl.hostname}${path ? path : ''}${
    newUrl.search ? newUrl.search : ''
  }`;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const { document } = new JSDOM(htmlBody).window;
  const allAnchors = document.querySelectorAll('a');
  const links = [...allAnchors].map(a => a.href);

  return links.map(link => {
    if (link.startsWith('http')) {
      return link;
    } else {
      return baseURL + link;
    }
  });
}

async function crawlPage(baseURL, currentURL, pages) {
  const currentUrlObj = new URL(currentURL);
  const baseUrlObj = new URL(baseURL);
  if (currentUrlObj.hostname !== baseUrlObj.hostname) {
    return pages;
  }

  const normalizedURL = normalizeURL(currentURL);

  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }
  pages[normalizedURL] = 1;

  console.log(`Crawling ${normalizedURL}`);

  try {
    const response = await fetch(currentURL);
    if (!response.ok) {
      console.error(`Something went wrong. Status code ${response.status}`);
      return pages;
    }
    if (!response.headers.get('Content-Type').includes('text/html')) {
      console.error('Wrong content type');
      return pages;
    }
    const html = await response.text();
    const urls = getURLsFromHTML(html, baseURL);
    for (const url of urls) {
      pages = await crawlPage(baseURL, url, pages);
    }
  } catch (error) {
    console.error(error.message);
  }

  return pages;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
