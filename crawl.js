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

module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
