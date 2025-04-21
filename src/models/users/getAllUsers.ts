import { UserQuery } from "#api/controllers/types.js";
import { User } from "#db/models/index.js";
import { HttpError } from "#middleware/error-handling.js";
import { FindOptions } from "sequelize/lib/model";

export const getAllUsers = async (queries: UserQuery): Promise<User[]> => {
  console.log("queries", queries);
  let { limit, order, p, sort_by } = queries;

  console.log("limit", limit);

  // Validation
  sort_by = sort_by === "null" ? undefined : sort_by;
  order = order === "null" ? undefined : order;

  console.log("sort_by", sort_by);

  // sort_by = sort_by ?? "created_at";
  order = order ?? "desc";
  limit = limit ?? 10;
  p = p ?? 1;

  const acceptedQueries = ["asc", "desc"];
  const acceptedSortQueries = ["name", "role_id", "user_name"];

  if ((sort_by && !acceptedSortQueries.includes(sort_by)) ?? (order && !acceptedQueries.includes(order))) {
    throw new HttpError(400, "Bad query value!");
  }

  const offset = +limit * +p - limit;

  const findOptions: FindOptions<User> = {
    attributes: ["user_id", "name", "user_name", "role_id"],
    // group: ["users.role_id", "user.role_id"],
    subQuery: false,
  };

  if (sort_by && order) {
    findOptions.order = [[sort_by, order]];
  }

  if (limit) {
    findOptions.limit = limit;
    findOptions.offset = offset;
  }

  const users = await User.findAll();

  return users;
};
