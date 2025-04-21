import { Article } from "#db/models/index.js";

export const createArticle = async (articleBody: {
  article_img_url: string;
  author: string;
  body: string;
  title: string;
  topic: string;
}): Promise<Article> => {
  const defaultArticleUrl = "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700";

  const { article_img_url = defaultArticleUrl, author, body, title, topic } = articleBody;

  const newArticle = await Article.create({
    article_img_url: article_img_url,
    author: author,
    body: body,
    comment_count: 0,
    title: title,
    topic: topic,
  });
  return newArticle;
};
