import { Comment } from "#db/models/index.js";
import { HttpError } from "#middleware/error-handling.js";

export const updateComment = async (commentId: number, inc_vote: number): Promise<Comment> => {
  const comment = await Comment.findOne({
    attributes: ["comment_id", "body", "article_id", "author", "votes"],
    where: { comment_id: commentId },
  });

  if (!comment) {
    throw new HttpError(404, "No data found");
  }

  comment.setAttributes({ votes: comment.votes + inc_vote });

  await comment.save();

  return comment;
};
