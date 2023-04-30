const { sortPages } = require('./report');

describe('sort pages fn', () => {
  it.only('sorts pages by num of links', () => {
    const sorted = sortPages(mockPages);
    sorted.forEach((arr, i) => {
      if (i < sorted.length - 1) {
        expect(arr[1]).toBeGreaterThanOrEqual(sorted[i + 1][1]);
      }
    });
  });
});

const mockPages = {
  'wagslane.dev': 63,
  'wagslane.dev/tags': 62,
  'wagslane.dev/about': 62,
  'wagslane.dev/index.xml': 62,
  'wagslane.dev/tags/business': 1,
  'wagslane.dev/posts/dark-patterns': 2,
  'wagslane.dev/posts/things-i-dont-want-to-do-to-grow-business': 2,
  'wagslane.dev/tags/clean-code': 1,
  'wagslane.dev/posts/zen-of-proverbs': 2,
  'wagslane.dev/posts/func-y-json-api': 2,
  'wagslane.dev/posts/keep-your-data-raw-at-rest': 2,
  'wagslane.dev/posts/continuous-deployments-arent-continuous-disruptions': 3,
  'wagslane.dev/posts/optimize-for-simplicit-first': 2,
  'wagslane.dev/tags/devops': 1,
  'wagslane.dev/posts/no-one-does-devops': 2,
  'wagslane.dev/posts/leave-scrum-to-rugby': 5,
  'wagslane.dev/posts/managers-that-cant-code': 4,
  'wagslane.dev/posts/kanban-vs-scrum': 4,
  'wagslane.dev/tags/education': 1,
  'wagslane.dev/posts/college-a-solution-in-search-of-a-problem': 2,
  'wagslane.dev/tags/golang': 1,
  'wagslane.dev/posts/guard-keyword-error-handling-golang': 2,
  'wagslane.dev/posts/gos-major-version-handling': 2,
  'wagslane.dev/posts/go-struct-ordering': 2,
  'wagslane.dev/tags/management': 1,
  'wagslane.dev/tags/philosophy': 1,
  'wagslane.dev/posts/what-a-crazy-religion': 2,
  'wagslane.dev/posts/a-case-against-a-case-for-the-book-of-mormon': 2,
  'wagslane.dev/tags/writing': 1,
  'wagslane.dev/posts/seo-is-a-scam-job': 2,
  'wagslane.dev/posts/collapsing-quality-of-devto': 2,
  'wagslane.dev/posts/developers-learn-to-say-no': 1,
};