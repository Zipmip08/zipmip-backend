import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { users, usersId } from './users';

export interface otpsAttributes {
  id: number;
  phone: string;
  code: string;
  expires_at: Date;
  attempts?: number;
  is_used?: boolean;
  created_at?: Date;
}

export type otpsPk = "id";
export type otpsId = otps[otpsPk];
export type otpsOptionalAttributes = "id" | "attempts" | "is_used" | "created_at";
export type otpsCreationAttributes = Optional<otpsAttributes, otpsOptionalAttributes>;

export class otps extends Model<otpsAttributes, otpsCreationAttributes> implements otpsAttributes {
  id!: number;
  phone!: string;
  code!: string;
  expires_at!: Date;
  attempts?: number;
  is_used?: boolean;
  created_at?: Date;

  // otps belongsTo users via phone
  phone_user!: users;
  getPhone_user!: Sequelize.BelongsToGetAssociationMixin<users>;
  setPhone_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createPhone_user!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof otps {
    return otps.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: users, // 🔴 ارجاع مستقیم به مدل
        key: "phone",
      },
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    attempts: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    is_used: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'otps',
    schema: 'public',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        name: "otps_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
