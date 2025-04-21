import { Role } from "#db/models/index.js";
import { HttpError } from "#middleware/error-handling.js";

export const updateRole = async (role_id: number, updatedUserData: Partial<Role>): Promise<Role> => {
  const role = await Role.findByPk(role_id);
  if (!role) {
    throw new HttpError(404, "No data found");
  }

  await role.update(updatedUserData);

  return role;
};
