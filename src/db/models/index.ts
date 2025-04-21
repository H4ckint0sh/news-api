import { Article } from "#db/models/article.model.js";
import { Comment } from "#db/models/comment.model.js";
import { Role } from "#db/models/role.model.js";
import { Topic } from "#db/models/topic.model.js";
import { User } from "#db/models/user.model.js";

export interface Models {
  Article: typeof Article;
  Comment: typeof Comment;
  Role: typeof Role;
  Topic: typeof Topic;
  User: typeof User;
}

const models = {
  Article,
  Comment,
  Role,
  Topic,
  User,
};

// Initialize associations
Object.values(models).forEach((model) => {
  if (typeof model.associate !== "function") {
    return;
  }
  console.log("Associating model:", model.name);
  model.associate(models);
});

export { Article, Comment, Role, Topic, User };
