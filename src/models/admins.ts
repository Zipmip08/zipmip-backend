import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface adminsAttributes {
  id: number;
  user_id: number;
  role: string;
  created_at?: Date;
  updated_at?: Date;
}

export type adminsPk = "id";
export type adminsId = admins[adminsPk];
export type adminsOptionalAttributes = "id" | "created_at" | "updated_at";
export type adminsCreationAttributes = Optional<adminsAttributes, adminsOptionalAttributes>;

export class admins extends Model<adminsAttributes, adminsCreationAttributes> implements adminsAttributes {
  id!: number;
  user_id!: number;
  role!: string;
  created_at?: Date;
  updated_at?: Date;

  // admins belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof admins {
    return admins.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'admins',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "admins_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
