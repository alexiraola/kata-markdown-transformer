type Link = {
  link: string,
  text: string,
  url: string
}
export class MarkdownTransformer {

  transform(markdown: string) {
    const links = this.findLinks(markdown);
    const uniqueLinks = Array.of(...new Set(links.map(link => link.url)));

    const transformed = this.transformLinks(markdown, links, uniqueLinks);
    const footnotes = this.generateFootnotes(uniqueLinks);

    return [transformed, ...footnotes].join("\n");
  }

  private findLinks(markdown: string): Link[] {
    const regex = /\[([^\]]+)\]\(([^\)]+)\)/g;
    const matches = Array.from(markdown.matchAll(regex));

    return matches.map(([link, text, url]) => ({ link, text, url }));
  }

  private transformLinks(markdown: string, links: Link[], uniqueLinks: string[]) {
    return links.reduce((markdown, { link, text, url }) => {
      const newLink = this.transformLink(text, url, uniqueLinks);
      return markdown.replace(link, newLink);
    }, markdown);
  }

  private transformLink(text: string, url: string, uniqueLinks: string[]) {
    return `${text} [^anchor${uniqueLinks.indexOf(url) + 1}]`;
  }

  private generateFootnotes(links: string[]) {
    return links.map((link, index) => `[^anchor${index + 1}]: ${link}`);
  }
}
