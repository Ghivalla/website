import parseArticle from "./article";
import parseSEO from "./seo";

export default function(entry) {
  const seo = parseSEO(entry.fields.seo);
  const articles = entry.fields.articles
    ? entry.fields.articles.map(article => parseArticle(article))
    : null;
  const { id, title, description } = entry.fields;
  return { title, id, description, articles, seo };
}
