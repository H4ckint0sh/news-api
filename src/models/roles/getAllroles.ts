import { Role } from "#db/models/index.js";
import { HttpError } from "#middleware/error-handling.js";

export const getAllRoles = async (): Promise<Role[]> => {
  try {
    const roles = await Role.findAll();

    // if (!roles) {
    //     // TODO: Check if 500 is the right status code
    //     throw new HttpError(400, 'No roles found');
    // }

    return roles;
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpError(500, `Error retrieving roles: ${error.message}`);
    }
    throw new HttpError(500, "Error retrieving roles");
  }
};
