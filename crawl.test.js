const fs = require('fs');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');
const htmlString = fs.readFileSync('./test.html', 'utf-8');

describe('noramlizeURL fn', () => {
  it('returns normalized version of url', () => {
    const url1 = 'http://google.com/path';
    const url2 = 'https://GooglE.Com/path/';
    const url3 = 'https://GooglE.Com/';

    expect(normalizeURL(url1)).toBe('google.com/path');
    expect(normalizeURL(url2)).toBe('google.com/path');
    expect(normalizeURL(url3)).toBe('google.com');
  });

  it('adds query params', () => {
    const url = 'https://GooglE.Com/path?search=cats';

    expect(normalizeURL(url)).toBe('google.com/path?search=cats');
  });
});

describe('getURLsFromHTML fn', () => {
  const baseUrl = 'https://www.bbc.com';

  it('finds all a tags in HTML body', () => {
    const links = getURLsFromHTML(htmlString);
    expect(links).toHaveLength(9);
  });

  it('converts relative urls to absolute urls', () => {
    const links = getURLsFromHTML(htmlString, baseUrl);
    links.forEach(link => {
      const url = new URL(link);
      expect(url).toHaveProperty('protocol');
      expect(url).toHaveProperty('hostname');
    });
  });
});
