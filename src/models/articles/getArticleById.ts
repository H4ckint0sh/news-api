import { Article, Comment, Topic, User } from "#db/models/index.js";
import { HttpError } from "#middleware/error-handling.js";
import { Sequelize } from "sequelize";

export const getArticleById = async (articleId: number): Promise<Article> => {
  const article = await Article.findOne({
    attributes: [
      "article_id",
      "author",
      [Sequelize.col("authorData.avatar_url"), "author_avatar_url"],
      "title",
      "body",
      "topic",
      "votes",
      "article_img_url",
      [Sequelize.cast(Sequelize.fn("COUNT", Sequelize.col("comments.comment_id")), "integer"), "comment_count"],
    ],
    group: ["Article.article_id", "authorData.user_name", "authorData.avatar_url", "topicData.slug"],
    include: [
      { as: "comments", attributes: [], model: Comment }, // optional: attributes: [] if you only need the count
      { as: "authorData", attributes: [], model: User },
      { as: "topicData", attributes: [], model: Topic },
    ],
    where: { article_id: articleId },
  });
  if (!article) {
    throw new HttpError(404, "No data found");
  }

  return article;
};
