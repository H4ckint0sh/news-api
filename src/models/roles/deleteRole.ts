import { Role } from "#db/models/index.js";
import { HttpError } from "#middleware/error-handling.js";

export const deleteRole = async (modetId: number) => {
  const rowCount = await Role.destroy({
    where: { role_id: modetId },
  });
  if (!rowCount) {
    throw new HttpError(404, "No data found");
  }
};
