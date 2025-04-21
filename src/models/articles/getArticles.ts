import { ArticleQuery } from "#api/controllers/types.js";
import { Article, Comment, Topic, User } from "#db/models/index.js";
import { ValidationError } from "#middleware/error-handling.js";
import { Sequelize } from "sequelize";

export const getArticles = async (queries: ArticleQuery): Promise<Article[]> => {
  let { limit, order, p, sort_by, topic } = queries;

  // Validation
  sort_by = sort_by === "null" ? undefined : sort_by;
  order = order === "null" ? undefined : order;
  topic = topic === "null" ? undefined : topic;

  sort_by = sort_by ?? "title";
  order = order ?? "desc";
  limit = limit ?? 10;
  p = p ?? 1;

  const acceptedQueries = ["asc", "desc"];
  const acceptedSortQueries = ["author", "title", "topic", "votes", "comment_count"];

  if (!acceptedSortQueries.includes(sort_by) || !acceptedQueries.includes(order)) {
    throw new ValidationError("Bad query value!");
  }

  // Convert to numbers to ensure proper calculation
  const numLimit = Number(limit);
  const numP = Number(p);
  const offset = numLimit * (numP - 1);

  const articles = await Article.findAll({
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
    limit: numLimit,
    offset,
    order: [[sort_by === "comment_count" ? Sequelize.literal("comment_count") : sort_by, order]],
    subQuery: false,
    where: topic ? { topic } : {},
  });

  return articles;
};
