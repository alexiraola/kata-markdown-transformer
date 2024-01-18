class MarkdownTransformer {

  transform(markdown: string) {
    return '';
  }
}

describe('Markdown transformer', () => {
  it('should transform a markdown with links to footnote anchors', () => {
    const markdown = `[this book](https://codigosostenible.com) and some other text.`;
    const expected = `this book [^anchor1] and some other text.
[^anchor1]: https://codigosostenible.com`;

    const transformer = new MarkdownTransformer();

    expect(transformer.transform(markdown)).toBe(expected);
  });
});
