import { Role } from "#db/models/index.js";

export const createRole = async (roleData: Role): Promise<Role> => {
  const createdRole = await Role.create(roleData);

  return createdRole;
};
