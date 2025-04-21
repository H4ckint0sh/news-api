import { Topic } from "#db/models/index.js";
import { HttpError } from "#middleware/error-handling.js";

export const createTopic = async (newTopicBody: Topic): Promise<Topic> => {
  const { description = "", slug } = newTopicBody;

  if (!slug) {
    throw new HttpError(400, "Topic slug is required");
  }

  const topic = await Topic.create({
    description: description,
    slug: slug,
  });

  return topic;
};
