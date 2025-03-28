import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { admins, adminsId } from "./admins";
import type { logs, logsId } from "./logs";
import type { otps, otpsId } from "./otps";
import type {
  phone_status,
  phone_statusCreationAttributes,
  phone_statusId,
} from "./phone_status";
import type { sessions, sessionsId } from "./sessions";
import type { transactions, transactionsId } from "./transactions";

export interface usersAttributes {
  id: number;
  phone: string;
  full_name?: string;
  role: string;
  is_verified?: boolean;
  is_active?: boolean;
  current_session_token?: string;
  createdAt?: Date;
  updatedAt?: Date;
  is_registered: boolean; // 🔴 اضافه شد
}
export type usersPk = "id";
export type usersId = users[usersPk];
export type usersOptionalAttributes =
  | "id"
  | "full_name"
  | "role"
  | "is_verified"
  | "is_active"
  | "current_session_token"
  | "createdAt"
  | "updatedAt";
export type usersCreationAttributes = Optional<
  usersAttributes,
  usersOptionalAttributes
>;

export class users
  extends Model<usersAttributes, usersCreationAttributes>
  implements usersAttributes
{
  id!: number;
  phone!: string;
  full_name?: string;
  role!: string;
  is_verified?: boolean;
  is_active?: boolean;
  current_session_token?: string;
  createdAt?: Date;
  updatedAt?: Date;
  public is_registered!: boolean;

  // users hasMany admins via user_id
  admins!: admins[];
  getAdmins!: Sequelize.HasManyGetAssociationsMixin<admins>;
  setAdmins!: Sequelize.HasManySetAssociationsMixin<admins, adminsId>;
  addAdmin!: Sequelize.HasManyAddAssociationMixin<admins, adminsId>;
  addAdmins!: Sequelize.HasManyAddAssociationsMixin<admins, adminsId>;
  createAdmin!: Sequelize.HasManyCreateAssociationMixin<admins>;
  removeAdmin!: Sequelize.HasManyRemoveAssociationMixin<admins, adminsId>;
  removeAdmins!: Sequelize.HasManyRemoveAssociationsMixin<admins, adminsId>;
  hasAdmin!: Sequelize.HasManyHasAssociationMixin<admins, adminsId>;
  hasAdmins!: Sequelize.HasManyHasAssociationsMixin<admins, adminsId>;
  countAdmins!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany logs via user_id
  logs!: logs[];
  getLogs!: Sequelize.HasManyGetAssociationsMixin<logs>;
  setLogs!: Sequelize.HasManySetAssociationsMixin<logs, logsId>;
  addLog!: Sequelize.HasManyAddAssociationMixin<logs, logsId>;
  addLogs!: Sequelize.HasManyAddAssociationsMixin<logs, logsId>;
  createLog!: Sequelize.HasManyCreateAssociationMixin<logs>;
  removeLog!: Sequelize.HasManyRemoveAssociationMixin<logs, logsId>;
  removeLogs!: Sequelize.HasManyRemoveAssociationsMixin<logs, logsId>;
  hasLog!: Sequelize.HasManyHasAssociationMixin<logs, logsId>;
  hasLogs!: Sequelize.HasManyHasAssociationsMixin<logs, logsId>;
  countLogs!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany otps via phone
  otps!: otps[];
  getOtps!: Sequelize.HasManyGetAssociationsMixin<otps>;
  setOtps!: Sequelize.HasManySetAssociationsMixin<otps, otpsId>;
  addOtp!: Sequelize.HasManyAddAssociationMixin<otps, otpsId>;
  addOtps!: Sequelize.HasManyAddAssociationsMixin<otps, otpsId>;
  createOtp!: Sequelize.HasManyCreateAssociationMixin<otps>;
  removeOtp!: Sequelize.HasManyRemoveAssociationMixin<otps, otpsId>;
  removeOtps!: Sequelize.HasManyRemoveAssociationsMixin<otps, otpsId>;
  hasOtp!: Sequelize.HasManyHasAssociationMixin<otps, otpsId>;
  hasOtps!: Sequelize.HasManyHasAssociationsMixin<otps, otpsId>;
  countOtps!: Sequelize.HasManyCountAssociationsMixin;
  // users hasOne phone_status via phone
  phone_status!: phone_status;
  getPhone_status!: Sequelize.HasOneGetAssociationMixin<phone_status>;
  setPhone_status!: Sequelize.HasOneSetAssociationMixin<
    phone_status,
    phone_statusId
  >;
  createPhone_status!: Sequelize.HasOneCreateAssociationMixin<phone_status>;
  // users hasMany sessions via user_id
  sessions!: sessions[];
  getSessions!: Sequelize.HasManyGetAssociationsMixin<sessions>;
  setSessions!: Sequelize.HasManySetAssociationsMixin<sessions, sessionsId>;
  addSession!: Sequelize.HasManyAddAssociationMixin<sessions, sessionsId>;
  addSessions!: Sequelize.HasManyAddAssociationsMixin<sessions, sessionsId>;
  createSession!: Sequelize.HasManyCreateAssociationMixin<sessions>;
  removeSession!: Sequelize.HasManyRemoveAssociationMixin<sessions, sessionsId>;
  removeSessions!: Sequelize.HasManyRemoveAssociationsMixin<
    sessions,
    sessionsId
  >;
  hasSession!: Sequelize.HasManyHasAssociationMixin<sessions, sessionsId>;
  hasSessions!: Sequelize.HasManyHasAssociationsMixin<sessions, sessionsId>;
  countSessions!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany transactions via user_id
  transactions!: transactions[];
  getTransactions!: Sequelize.HasManyGetAssociationsMixin<transactions>;
  setTransactions!: Sequelize.HasManySetAssociationsMixin<
    transactions,
    transactionsId
  >;
  addTransaction!: Sequelize.HasManyAddAssociationMixin<
    transactions,
    transactionsId
  >;
  addTransactions!: Sequelize.HasManyAddAssociationsMixin<
    transactions,
    transactionsId
  >;
  createTransaction!: Sequelize.HasManyCreateAssociationMixin<transactions>;
  removeTransaction!: Sequelize.HasManyRemoveAssociationMixin<
    transactions,
    transactionsId
  >;
  removeTransactions!: Sequelize.HasManyRemoveAssociationsMixin<
    transactions,
    transactionsId
  >;
  hasTransaction!: Sequelize.HasManyHasAssociationMixin<
    transactions,
    transactionsId
  >;
  hasTransactions!: Sequelize.HasManyHasAssociationsMixin<
    transactions,
    transactionsId
  >;
  countTransactions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        is_registered: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false, // پیش‌فرض false
        },
        phone: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: "users_phone_key",
        },
        full_name: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        role: {
          type: DataTypes.STRING(50),
          allowNull: false,
          defaultValue: "user",
        },
        is_verified: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true,
        },
        current_session_token: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "created_at",
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "updated_at",
        },
      },
      {
        sequelize,
        tableName: "users",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            name: "users_phone_key",
            unique: true,
            fields: [{ name: "phone" }],
          },
          {
            name: "users_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
