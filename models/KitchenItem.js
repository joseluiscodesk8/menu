import { DataTypes } from 'sequelize';
import sequelize from '../db';

export default function defineKitchenItemModel(tableName) {
  return sequelize.define(tableName, {
    imagen: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numeroMesa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName,
    timestamps: false,
  });
}