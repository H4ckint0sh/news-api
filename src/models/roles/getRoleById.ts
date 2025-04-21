import { Role } from "#db/models/index.js";
import { HttpError } from "#middleware/error-handling.js";

export const getRoleById = async (role_id: number): Promise<Role> => {
  const user = await Role.findOne({
    attributes: ["role_id", "name", "status"],
    where: { role_id: role_id },
  });

  if (!user) {
    throw new HttpError(404, "No data found");
  }

  return user;
};
