export function processArticle(article) {
  const parseArticle = article.split("\n");
  const title = parseArticle[0].split("#")[1].trim();
  const description =
    parseArticle[1] !== "" ? parseArticle[1].trim() : parseArticle[2].trim();
  const regex = /\*(.*?)\*/g;
  return { content: article.replace(regex, "").trim(), title, description };
}
