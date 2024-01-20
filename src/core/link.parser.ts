export class LinkParser {
  static parse(markdown: string) {
    const regex = /\[([^\]]+)\]\(([^\)]+)\)/g;
    const matches = Array.from(markdown.matchAll(regex));

    return matches.map(([link, text, url]) => ({ link, text, url }));
  }
}
