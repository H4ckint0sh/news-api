// src/db/models/role.model.ts
import sequelize from "#db/connection.js";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import { Models } from "./index.js";

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  static associate: (models: Models) => void;
  declare name: string;
  declare role_id: CreationOptional<number>;

  declare status: CreationOptional<boolean>;
}

Role.init(
  {
    name: {
      allowNull: false,
      type: DataTypes.STRING(20),
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    role_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    status: {
      allowNull: false,
      comment: "Active/inactive status",
      defaultValue: true,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: sequelize,
    tableName: "roles",
    timestamps: false,
    underscored: true,
  },
);

export { Role };
