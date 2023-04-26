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

module.exports = {
  normalizeURL,
};
