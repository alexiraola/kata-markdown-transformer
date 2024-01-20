class LinkFinder {
  findLinks(markdown: string) {
    const regex = /\[([^\[]+)\](\(.*\))/gm;
    const singleRegex = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)$/;

    const matches = markdown.match(regex);

    return matches && matches.map(match => match.match(singleRegex))
      .flatMap(match => match !== null ? [match] : [])
      .map(([_, text, link]) => ({ text, link })) || [];
  }
}

describe('Link finder', () => {
  let linkFinder: LinkFinder;

  beforeEach(() => {
    linkFinder = new LinkFinder();
  });

  it('should return an empty array given a markdown with no links', () => {
    expect(linkFinder.findLinks(`no links here`)).toEqual([]);
  });

  it('should return a list of links given a markdown string', () => {
    const markdown = `[this book](https://codigosostenible.com) and some other text.`;
    const expectedResult = [{ text: 'this book', link: 'https://codigosostenible.com' }];

    expect(linkFinder.findLinks(markdown)).toStrictEqual(expectedResult);
  });

  it('should return a list of links give a markdown with many links', () => {
    const markdown = `
[this book](https://codigosostenible.com) and some other text.
Another example is [this one](https://google.com), one of my favorites.`;
    const expectedResult = [
      { text: 'this book', link: 'https://codigosostenible.com' },
      { text: 'this one', link: 'https://google.com' }
    ];

    expect(linkFinder.findLinks(markdown)).toStrictEqual(expectedResult);
  });
});
