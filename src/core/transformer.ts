import { LinkFinder } from "../core/linkfinder";

export class MarkdownTransformer {

  transform(markdown: string) {
    const regex = /\[([^\[]+)\](\(.*\))/gm;
    const linkFinder = new LinkFinder();
    const links = linkFinder.findLinks(markdown);
    const uniqueLinks = Array.of(...new Set(links.map(link => link.link)));

    const matches = markdown.match(regex);

    if (!matches) {
      return markdown;
    }

    const transformed = matches.reduce((markdown, link) => {
      const newLink = this.transformLink(link, uniqueLinks);
      return markdown.replace(link, newLink);
    }, markdown) || markdown;

    const footnote = uniqueLinks.map((link, index) => `[^anchor${index + 1}]: ${link}`).join("\n");

    return `${transformed}\n${footnote}`;
  }

  private transformLink(link: string, uniqueLinks: string[]) {
    const regex = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)$/;
    const match = link.match(regex);

    if (!match) {
      return link;
    }

    const [_, text, url] = match;

    return `${text} [^anchor${uniqueLinks.indexOf(url) + 1}]`;
  }
}
