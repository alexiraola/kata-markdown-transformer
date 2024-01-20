import { Links } from "./links";

export class MarkdownTransformer {

  private constructor(private readonly markdown: string, private readonly links: Links) { }

  static create(markdown: string) {
    return new MarkdownTransformer(markdown, Links.create(markdown));
  }

  transform() {
    const transformed = this.transformLinks(this.markdown, this.links);
    const footnotes = this.generateFootnotes(this.links);

    return [transformed, ...footnotes].join("\n");
  }

  private transformLinks(markdown: string, links: Links) {
    return links.allLinks().reduce((markdown, { link, text, url }) => {
      const index = links.indexOf(url);
      const newLink = `${text} [^anchor${index}]`;

      return markdown.replace(link, newLink);
    }, markdown);
  }

  private generateFootnotes(links: Links) {
    return links.mapUnique((link, index) => `[^anchor${index}]: ${link}`);
  }
}
