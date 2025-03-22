import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface phone_statusAttributes {
  phone: string;
  failed_attempts?: number;
  locked_until?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export type phone_statusPk = "phone";
export type phone_statusId = phone_status[phone_statusPk];
export type phone_statusOptionalAttributes = "failed_attempts" | "locked_until" | "created_at" | "updated_at";
export type phone_statusCreationAttributes = Optional<phone_statusAttributes, phone_statusOptionalAttributes>;

export class phone_status extends Model<phone_statusAttributes, phone_statusCreationAttributes> implements phone_statusAttributes {
  phone!: string;
  failed_attempts?: number;
  locked_until?: Date;
  created_at?: Date;
  updated_at?: Date;

  // phone_status belongsTo users via phone
  phone_user!: users;
  getPhone_user!: Sequelize.BelongsToGetAssociationMixin<users>;
  setPhone_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createPhone_user!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof phone_status {
    return phone_status.init({
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'phone'
      }
    },
    failed_attempts: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    locked_until: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'phone_status',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "phone_status_pkey",
        unique: true,
        fields: [
          { name: "phone" },
        ]
      },
    ]
  });
  }
}
