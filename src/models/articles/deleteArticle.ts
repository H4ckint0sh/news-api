import { Article } from "#db/models/index.js";
import { HttpError } from "#middleware/error-handling.js";

export const deleteArticle = async (articleId: number) => {
  const rowCount = await Article.destroy({
    where: { article_id: articleId },
  });
  if (!rowCount) {
    throw new HttpError(404, "No data found");
  }
};
