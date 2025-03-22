import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface sessionsAttributes {
  id: number;
  user_id: number;
  token_hash: string;
  created_at?: Date;
  expires_at: Date;
}

export type sessionsPk = "id";
export type sessionsId = sessions[sessionsPk];
export type sessionsOptionalAttributes = "id" | "created_at";
export type sessionsCreationAttributes = Optional<sessionsAttributes, sessionsOptionalAttributes>;

export class sessions extends Model<sessionsAttributes, sessionsCreationAttributes> implements sessionsAttributes {
  id!: number;
  user_id!: number;
  token_hash!: string;
  created_at?: Date;
  expires_at!: Date;

  // sessions belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof sessions {
    return sessions.init({
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
    token_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'sessions',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "sessions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
