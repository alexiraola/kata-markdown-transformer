export class LinkFinder {
  findLinks(markdown: string) {
    const regex = /\[([^\[]+)\](\(.*\))/gm;
    const singleRegex = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)$/;

    const matches = markdown.match(regex);

    return matches && matches.map(match => match.match(singleRegex))
      .flatMap(match => match !== null ? [match] : [])
      .map(([_, text, link]) => ({ text, link })) || [];
  }
}
