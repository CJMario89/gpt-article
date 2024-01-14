export function processArticle(article) {
  const parseArticle = article.split("\n");
  const title = parseArticle.shift().replace(/#|\*/g, "").trim();
  const description = shiftTillContentExist(parseArticle)
    .replace(/#|\*/g, "")
    .trim();
  const regex = /\*(.*?)\*/g;
  const _article = removeGPTHint(parseArticle);
  return {
    content: _article.replace(regex, "").trim(),
    title,
    description,
  };
}

function shiftTillContentExist(parseArticle) {
  //too many space between description and title
  const description = parseArticle.shift();
  if (
    description !== "" &&
    description?.replace(/#/g, "")?.trim() !== "Introduction"
  ) {
    return description;
  }
  return shiftTillContentExist(parseArticle);
}

function removeGPTHint(parseArticle) {
  const regexUnwantedText = /gpt|markdown/i;
  return parseArticle
    .filter((paragraph) => !regexUnwantedText.test(paragraph))
    .join("\n");
}

export function processArticleInBlog(article = "") {
  return article?.split("\n");
}
