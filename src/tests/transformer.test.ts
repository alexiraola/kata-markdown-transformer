import { MarkdownTransformer } from '../core/transformer';

describe('Markdown transformer', () => {
  let transformer: MarkdownTransformer;

  beforeEach(() => {
    transformer = new MarkdownTransformer();
  });

  it('should return the same markdown given a text with no links', () => {
    const markdown = `this book and some other text.`;

    expect(transformer.transform(markdown)).toEqual(markdown);
  });

  it('should transform a markdown with links to footnote anchors', () => {
    const markdown = `[this book](https://codigosostenible.com) and some other text.`;
    const expected = `this book [^anchor1] and some other text.
[^anchor1]: https://codigosostenible.com`;

    expect(transformer.transform(markdown)).toBe(expected);
  });

  it('should transform a markdown with many links to footnote anchors', () => {
    const markdown = `
[this book](https://codigosostenible.com) and some other text.
There is [another book](https://google.com) that has text too.`;
    const expected = `
this book [^anchor1] and some other text.
There is another book [^anchor2] that has text too.
[^anchor1]: https://codigosostenible.com
[^anchor2]: https://google.com`;

    expect(transformer.transform(markdown)).toEqual(expected);
  });

  it('should transform a markdown with repeated links to footnote anchors', () => {
    const markdown = `
[this book](https://codigosostenible.com) and some other text.
There is [another book](https://google.com) that has text too.
Even a [third book](https://google.com) could look similar.`;
    const expected = `
this book [^anchor1] and some other text.
There is another book [^anchor2] that has text too.
Even a third book [^anchor2] could look similar.
[^anchor1]: https://codigosostenible.com
[^anchor2]: https://google.com`;

    expect(transformer.transform(markdown)).toEqual(expected);
  });
});
