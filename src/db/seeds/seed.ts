import db from "#db/connection.js";
import { Article, Comment, Role, Topic, User } from "#db/models/index.js";

import { createRef, formatComments } from "./utils.js";

// Define a type that includes the necessary properties for CommentData
export type CommentDataInput = Omit<Comment, "article_id" | "belongs_to"> & {
  author: string; //Adding the missing author property
  belongs_to: string; // Assuming belongs_to should be a string (article title)
  created_by: string; // Assuming created_by should be a string (username)
};

export interface SeedData {
  articleData: Article[];
  commentData: Comment[];
  roleData: Role[];
  topicData: Topic[];
  userData: User[];
}

const seed = async ({ articleData, commentData, roleData, topicData, userData }: SeedData) => {
  await db.sync({ force: true });
  // Create topics
  await Topic.bulkCreate(topicData, { ignoreDuplicates: true });

  //Create roles
  await Role.bulkCreate(roleData, { ignoreDuplicates: true });

  // Create users
  await User.bulkCreate(userData, { individualHooks: true });

  // Create articles
  const createdArticles = await Article.bulkCreate(articleData, {
    returning: true,
  });

  // Create comments
  const articleIdLookup = createRef(createdArticles, "title", "article_id");

  const formattedCommentData = formatComments(commentData as unknown as CommentDataInput[], articleIdLookup);
  await Comment.bulkCreate(formattedCommentData);

  console.log("seeded");
};

export default seed;
