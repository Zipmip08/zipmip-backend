import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface transactionsAttributes {
  id: number;
  user_id: number;
  amount: number;
  currency: string;
  status: string;
  created_at?: Date;
}

export type transactionsPk = "id";
export type transactionsId = transactions[transactionsPk];
export type transactionsOptionalAttributes = "id" | "created_at";
export type transactionsCreationAttributes = Optional<transactionsAttributes, transactionsOptionalAttributes>;

export class transactions extends Model<transactionsAttributes, transactionsCreationAttributes> implements transactionsAttributes {
  id!: number;
  user_id!: number;
  amount!: number;
  currency!: string;
  status!: string;
  created_at?: Date;

  // transactions belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof transactions {
    return transactions.init({
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
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'transactions',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "transactions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
