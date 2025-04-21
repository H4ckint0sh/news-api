import { ArticleQuery } from "#api/controllers/types.js";
import { Comment } from "#db/models/index.js";
import { Article } from "#db/models/index.js";
import { User } from "#db/models/index.js";
import { HttpError, ValidationError } from "#middleware/error-handling.js";
import { Sequelize } from "sequelize";

export const getCommentsByArticleId = async (articleId: number, queries: ArticleQuery): Promise<Comment[]> => {
  const { limit = 10, p = 1 } = queries;

  if (isNaN(limit) || isNaN(p)) {
    throw new ValidationError("Bad query value!");
  }

  const offset = +limit * +p - 10;

  const article = await Article.findOne({
    where: { article_id: articleId },
  });

  if (!article) {
    throw new HttpError(404, "No data found");
  }

  console.log(article);
  const comments = await Comment.findAll({
    attributes: ["comment_id", "body", "article_id", "author", "votes", [Sequelize.col("authorData.avatar_url"), "author_avatar_url"]],
    include: [
      { as: "authorData", attributes: [], model: User },
      { as: "article", attributes: [], model: Article },
    ],
    limit: limit,
    offset: offset,
    order: [["createdAt", "DESC"]],
    where: {
      article_id: articleId,
    },
  });

  return comments;
};
