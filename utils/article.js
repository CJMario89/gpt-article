export function processArticle(article) {
  const parseArticle = article.split("\n");
  const title = parseArticle[0].split("#")[1].trim();
  const description =
    parseArticle[1] !== "" ? parseArticle[1].trim() : parseArticle[2].trim();
  const regex = /\*(.*?)\*/g;
  const _article = removeGPTHint(parseArticle);
  return {
    content: _article.replace(regex, "").trim().replaceAll("'", "''"),
    title,
    description,
  };
}

function removeGPTHint(parseArticle) {
  return parseArticle
    .filter((paragraph) => !paragraph.includes("GPT"))
    .join("\n");
}
