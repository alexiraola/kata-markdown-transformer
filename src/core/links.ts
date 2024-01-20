import { LinkParser } from "./link.parser";

export type Link = {
  link: string,
  text: string,
  url: string
}

export class Links {
  private constructor(private readonly links: Link[], private readonly unique: string[]) { }

  static create(markdown: string) {
    const links = LinkParser.parse(markdown);
    const uniqueLinks = Array.of(...new Set(links.map(link => link.url)));

    return new Links(links, uniqueLinks);
  }

  allLinks() {
    return this.links;
  }

  indexOf(url: string) {
    return this.unique.indexOf(url) + 1;
  }

  mapUnique(transform: (link: string, index: number) => string) {
    return this.unique.map((link, index) => transform(link, index + 1));
  }
}
