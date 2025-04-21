import { User } from "#db/models/index.js";
import { HttpError } from "#middleware/error-handling.js";

export const createUser = async (userData: User): Promise<User> => {
  try {
    const createdUser = await User.create({
      ...userData,
    });

    return createdUser;
  } catch {
    throw new HttpError(500, "User creation failed");
  }
};
