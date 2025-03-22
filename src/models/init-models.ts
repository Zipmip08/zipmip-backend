import type { Sequelize } from "sequelize";
import { admins as _admins } from "./admins";
import type { adminsAttributes, adminsCreationAttributes } from "./admins";
import { logs as _logs } from "./logs";
import type { logsAttributes, logsCreationAttributes } from "./logs";
import { otps as _otps } from "./otps";
import type { otpsAttributes, otpsCreationAttributes } from "./otps";
import { phone_status as _phone_status } from "./phone_status";
import type { phone_statusAttributes, phone_statusCreationAttributes } from "./phone_status";
import { sessions as _sessions } from "./sessions";
import type { sessionsAttributes, sessionsCreationAttributes } from "./sessions";
import { transactions as _transactions } from "./transactions";
import type { transactionsAttributes, transactionsCreationAttributes } from "./transactions";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _admins as admins,
  _logs as logs,
  _otps as otps,
  _phone_status as phone_status,
  _sessions as sessions,
  _transactions as transactions,
  _users as users,
};

export type {
  adminsAttributes,
  adminsCreationAttributes,
  logsAttributes,
  logsCreationAttributes,
  otpsAttributes,
  otpsCreationAttributes,
  phone_statusAttributes,
  phone_statusCreationAttributes,
  sessionsAttributes,
  sessionsCreationAttributes,
  transactionsAttributes,
  transactionsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const admins = _admins.initModel(sequelize);
  const logs = _logs.initModel(sequelize);
  const otps = _otps.initModel(sequelize);
  const phone_status = _phone_status.initModel(sequelize);
  const sessions = _sessions.initModel(sequelize);
  const transactions = _transactions.initModel(sequelize);
  const users = _users.initModel(sequelize);

  admins.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(admins, { as: "admins", foreignKey: "user_id"});
  logs.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(logs, { as: "logs", foreignKey: "user_id"});
  otps.belongsTo(users, { as: "phone_user", foreignKey: "phone"});
  users.hasMany(otps, { as: "otps", foreignKey: "phone"});
  phone_status.belongsTo(users, { as: "phone_user", foreignKey: "phone"});
  users.hasOne(phone_status, { as: "phone_status", foreignKey: "phone"});
  sessions.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(sessions, { as: "sessions", foreignKey: "user_id"});
  transactions.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(transactions, { as: "transactions", foreignKey: "user_id"});

  return {
    admins: admins,
    logs: logs,
    otps: otps,
    phone_status: phone_status,
    sessions: sessions,
    transactions: transactions,
    users: users,
  };
}
