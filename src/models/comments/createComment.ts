import { Comment } from "#db/models/index.js";
import { Article } from "#db/models/index.js";
import { HttpError, ValidationError } from "#middleware/error-handling.js";

export const createComment = async (articleId: number, reqBody: { body: string; user_name: string }): Promise<Comment> => {
  const { body, user_name } = reqBody;
  console.log(body, user_name);

  if (typeof body !== "string" || typeof user_name !== "string") {
    throw new ValidationError("Bad request");
  }

  const article = await Article.findOne({
    where: { article_id: articleId },
  });

  if (!article) {
    throw new HttpError(404, "Foreign Key Violation");
  }

  const newComment = await Comment.create({
    article_id: articleId,
    author: user_name,
    body: body,
  });

  return newComment;
};
