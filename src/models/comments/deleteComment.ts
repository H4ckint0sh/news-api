import { Comment } from "#db/models/index.js";
import { HttpError } from "#middleware/error-handling.js";

export const deleteComment = async (comment_id: number) => {
  const rowCount = await Comment.destroy({
    where: { comment_id: comment_id },
  });

  if (!rowCount) {
    throw new HttpError(404, "No data found");
  }
};
