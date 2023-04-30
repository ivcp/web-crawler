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

async function crawlPage(baseURL) {
  try {
    const response = await fetch(baseURL);
    if (!response.ok) {
      throw new Error(`Something went wrong. Status code ${response.status}`);
    }
    if (!response.headers.get('Content-Type').includes('text/html')) {
      throw new Error('Wrong content type');
    }
    const body = await response.text();
    console.log(body);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
