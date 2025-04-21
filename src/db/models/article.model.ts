import db from "#db/connection.js";
import { Comment, Topic, User } from "#db/models/index.js";
import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";

class Article extends Model<InferAttributes<Article>, InferCreationAttributes<Article>> {
  static associations: {
    authorData: Association<Article, User>;
    comments: Association<Article, Comment>;
    topicData: Association<Article, Topic>;
  };
  declare article_id: CreationOptional<number>;
  declare article_img_url: CreationOptional<string>;
  declare author: ForeignKey<User["user_name"]>;
  // Associations
  declare authorData?: NonAttribute<User>;
  declare body: string;
  declare comment_count: CreationOptional<number>;
  declare comments?: NonAttribute<Comment[]>;

  declare title: string;
  declare topic: ForeignKey<Topic["slug"]>;
  declare topicData?: NonAttribute<Topic>;

  declare votes: CreationOptional<number>;

  static associate(models: { Comment: typeof Comment; Topic: typeof Topic; User: typeof User }) {
    Article.hasMany(models.Comment, {
      as: "comments",
      foreignKey: "article_id",
      onDelete: "CASCADE",
    });

    Article.belongsTo(models.User, {
      as: "authorData",
      foreignKey: "author",
      onDelete: "CASCADE",
      targetKey: "user_name",
    });

    Article.belongsTo(models.Topic, {
      as: "topicData",
      foreignKey: "topic",
      targetKey: "slug",
    });
  }
}

Article.init(
  {
    article_id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    article_img_url: {
      defaultValue: "https://example.com/default.jpg",
      type: DataTypes.STRING,
    },
    author: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    body: {
      allowNull: false,
      type: DataTypes.STRING(5000),
    },
    comment_count: {
      defaultValue: 0,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    topic: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    votes: {
      defaultValue: 0,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    tableName: "articles",
    timestamps: true,
    underscored: true,
  },
);

export { Article };
