import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface logsAttributes {
  id: number;
  user_id?: number;
  action: string;
  ip_address?: string;
  user_agent?: string;
  created_at?: Date;
}

export type logsPk = "id";
export type logsId = logs[logsPk];
export type logsOptionalAttributes = "id" | "user_id" | "ip_address" | "user_agent" | "created_at";
export type logsCreationAttributes = Optional<logsAttributes, logsOptionalAttributes>;

export class logs extends Model<logsAttributes, logsCreationAttributes> implements logsAttributes {
  id!: number;
  user_id?: number;
  action!: string;
  ip_address?: string;
  user_agent?: string;
  created_at?: Date;

  // logs belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof logs {
    return logs.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    action: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'logs',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "logs_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
