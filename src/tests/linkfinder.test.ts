class LinkFinder {
  findLinks(markdown: string) {
    const regex = /\[([^\[]+)\](\(.*\))/gm;
    const singleRegex = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)$/;

    const matches = markdown.match(regex);

    if (!matches) {
      return [];
    }

    console.log(matches);

    const links: { text: string, link: string }[] = [];
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i].match(singleRegex);

      if (match !== null) {
        const [_, text, link] = match;

        links.push({ text, link });
      }
    }

    return links;
    // return matches.map(match => singleRegex.exec(match)).map(match => ({ text: match[1], link: match[2] })) || [];
  }
}

describe('Link finder', () => {
  it('should return a list of links given a markdown string', () => {
    const markdown = `[this book](https://codigosostenible.com) and some other text.`;
    const expectedResult = [{ text: 'this book', link: 'https://codigosostenible.com' }];

    const linkFinder = new LinkFinder();

    expect(linkFinder.findLinks(markdown)).toStrictEqual(expectedResult);
  })
});
