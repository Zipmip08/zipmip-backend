import type { Sequelize } from "sequelize";
import { users as _users } from "./users";
import { sessions as _sessions } from "./sessions";
import { admins as _admins } from "./admins";
import { logs as _logs } from "./logs";
import { otps as _otps } from "./otps";
import { transactions as _transactions } from "./transactions";
import { phone_status as _phone_status } from "./phone_status";

export {
  _users as users,
  _sessions as sessions,
  _admins as admins,
  _logs as logs,
  _otps as otps,
  _transactions as transactions,
  _phone_status as phone_status,
};

export function initModels(sequelize: Sequelize) {
  const users = _users.initModel(sequelize);
  const sessions = _sessions.initModel(sequelize);
  const admins = _admins.initModel(sequelize);
  const logs = _logs.initModel(sequelize);
  const otps = _otps.initModel(sequelize);
  const transactions = _transactions.initModel(sequelize);
  const phone_status = _phone_status.initModel(sequelize);

  // Define associations
  users.hasMany(sessions, { foreignKey: "user_id" });
  sessions.belongsTo(users, { foreignKey: "user_id" });

  users.hasMany(admins, { foreignKey: "user_id" });
  admins.belongsTo(users, { foreignKey: "user_id" });

  users.hasMany(logs, { foreignKey: "user_id" });
  logs.belongsTo(users, { foreignKey: "user_id" });

  users.hasMany(otps, { foreignKey: "phone", sourceKey: "phone" });
  otps.belongsTo(users, { foreignKey: "phone", targetKey: "phone" });

  users.hasMany(transactions, { foreignKey: "user_id" });
  transactions.belongsTo(users, { foreignKey: "user_id" });

  users.hasOne(phone_status, { foreignKey: "phone", sourceKey: "phone" });
  phone_status.belongsTo(users, { foreignKey: "phone", targetKey: "phone" });

  return {
    users,
    sessions,
    admins,
    logs,
    otps,
    transactions,
    phone_status,
  };
}
