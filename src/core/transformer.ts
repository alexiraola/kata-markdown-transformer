import { LinkFinder } from "../core/linkfinder";

export class MarkdownTransformer {

  transform(markdown: string) {
    const regex = /\[([^\]]+)\]\(([^\)]+)\)/g;

    const linkFinder = new LinkFinder();
    const links = linkFinder.findLinks(markdown);
    const uniqueLinks = Array.of(...new Set(links.map(link => link.link)));

    const matches = Array.from(markdown.matchAll(regex));

    const transformed = matches.reduce((markdown, [link, text, url]) => {
      const newLink = this.transformLink(text, url, uniqueLinks);
      return markdown.replace(link, newLink);
    }, markdown);

    return [transformed, ...this.generateFootnotes(uniqueLinks)].join("\n");
  }

  private transformLink(text: string, url: string, uniqueLinks: string[]) {
    return `${text} [^anchor${uniqueLinks.indexOf(url) + 1}]`;
  }

  private generateFootnotes(links: string[]) {
    return links.map((link, index) => `[^anchor${index + 1}]: ${link}`);
  }
}
