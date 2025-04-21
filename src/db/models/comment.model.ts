import sequelize from "#db/connection.js";
import { Article, User } from "#db/models/index.js";
import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";

class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment, { omit: "comment_id" | "votes" }>> {
  static associations: {
    article: Association<Comment, Article>;
    authorData: Association<Comment, User>;
  };
  // Associations
  declare article?: NonAttribute<Article>;
  declare article_id: ForeignKey<Article["article_id"]>;
  declare author: ForeignKey<User["user_name"]>;
  declare authorData?: NonAttribute<User>;
  declare body: string;

  declare comment_id: CreationOptional<number>;

  declare votes: CreationOptional<number>;

  // Add static associate method
  static associate(models: { Article: typeof Article; User: typeof User }) {
    Comment.belongsTo(models.Article, {
      as: "article",
      foreignKey: "article_id",
      onDelete: "CASCADE",
    });

    Comment.belongsTo(models.User, {
      as: "authorData",
      foreignKey: "author",
      onDelete: "CASCADE",
      targetKey: "user_name",
    });
  }
}

Comment.init(
  {
    article_id: {
      allowNull: false,
      references: {
        key: "article_id",
        model: "articles",
      },
      type: DataTypes.INTEGER,
    },
    author: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    body: {
      allowNull: false,
      type: DataTypes.STRING(500),
    },
    comment_id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    votes: {
      defaultValue: 0,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: "comments",
    timestamps: true,
    underscored: true,
  },
);

export { Comment };
