import { User } from "#db/models/index.js";
import { HttpError } from "#middleware/error-handling.js";

export const updateUser = async (userId: number, updatedUserData: Partial<User>): Promise<User> => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new HttpError(404, "User not found");
  }

  await user.update(updatedUserData);
  return user;
};
