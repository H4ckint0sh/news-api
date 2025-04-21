import { User } from "#db/models/index.js";
import * as models from "#db/models/index.js";
import { HttpError } from "#middleware/error-handling.js";

export const getUserById = async (userId: number): Promise<User> => {
  const user = await models.User.findOne({
    attributes: ["user_id", "name", "user_name", "role_id"],
    where: { user_id: userId },
  });

  if (!user) {
    throw new HttpError(404, "No data found");
  }

  return user;
};
