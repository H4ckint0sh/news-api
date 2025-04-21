import db from "#db/connection.js";
import { Comment } from "#db/models/index.js"; // Assuming you have a Comment model
import { Article } from "#db/models/index.js"; // Assuming you have an Article model
import { Role } from "#db/models/index.js"; // Assuming you have a Role model
import bcrypt from "bcryptjs";
import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  static associations: {
    articles: Association<User, Article>;
    comments: Association<User, Comment>;
    role: Association<User, Role>;
  };
  declare articles?: NonAttribute<Article[]>;
  declare avatar_url: string;
  declare comments?: NonAttribute<Comment[]>;
  declare name: string;
  declare password: string;
  declare role_id: ForeignKey<Role["role_id"]>;

  declare user_id: CreationOptional<number>;

  declare user_name: string;

  static associate(models: { Article: typeof Article; Comment: typeof Comment; Role: typeof Role }) {
    User.hasMany(models.Comment, {
      as: "comments",
      foreignKey: "author",
      onDelete: "CASCADE",
      sourceKey: "user_name",
    });

    User.hasMany(models.Article, {
      as: "articles",
      foreignKey: "author",
      onDelete: "CASCADE",
      sourceKey: "user_name",
    });
    User.belongsTo(models.Role, {
      as: "role",
      foreignKey: "role_id",
      targetKey: "role_id",
    });
  }
}

User.init(
  {
    avatar_url: {
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role_id: {
      field: "role_id",
      type: DataTypes.INTEGER,
    },
    user_id: {
      autoIncrement: true,
      field: "user_id",
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_name: {
      allowNull: false,
      field: "user_name",
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
    sequelize: db,
    tableName: "users",
    timestamps: true,
    underscored: true,
  },
);

export { User };
