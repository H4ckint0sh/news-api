import sequelize from "#db/connection.js";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import { Models } from "./index.js";

class Topic extends Model<InferAttributes<Topic>, InferCreationAttributes<Topic>> {
  static associate: (models: Models) => void;

  declare description: CreationOptional<string>;

  declare slug: string;
}

Topic.init(
  {
    description: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    slug: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "topics",
    timestamps: false,
    underscored: true,
  },
);

// Association with Article
export { Topic };
