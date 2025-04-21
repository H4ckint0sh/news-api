import { Topic } from "#db/models/index.js";
import { HttpError } from "#middleware/error-handling.js";

export const getTopics = async (): Promise<Topic[]> => {
  const topics = await Topic.findAll({
    attributes: ["slug", "description"],
  });

  if (!topics.length) {
    throw new HttpError(404, "No data found");
  }

  return topics;
};
