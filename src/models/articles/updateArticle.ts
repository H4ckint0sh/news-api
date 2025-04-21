import { Article } from "#db/models/index.js";
import { HttpError } from "#middleware/error-handling.js";

export const updateArticle = async (articleId: number, inc_vote: string): Promise<Article> => {
  const article = await Article.findOne({
    where: { article_id: articleId },
  });

  if (!article) {
    throw new HttpError(404, "No data found");
  }

  article.votes = article.votes + Number(inc_vote);
  console.log("saving");

  await article.save();

  console.log("saved");

  return article;
};
