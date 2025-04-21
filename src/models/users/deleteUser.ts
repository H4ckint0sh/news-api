import { User } from "#db/models/index.js";
import { HttpError } from "#middleware/error-handling.js";

export const deleteUser = async (userId: number): Promise<void> => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new HttpError(404, "No data found");
  }

  const rowCount = await User.destroy({
    where: { user_id: userId },
  });

  if (rowCount === 0) {
    throw new HttpError(500, "Failed to delete user after handling foreign key constraints.");
  }
};
