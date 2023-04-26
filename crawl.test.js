const { normalizeURL } = require('./crawl.js');

describe('noramlize fn', () => {
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
