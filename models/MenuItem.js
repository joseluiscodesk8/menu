const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const MenuItem = sequelize.define('MenuItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  precio: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'menu_items',
  timestamps: false,
});

module.exports = MenuItem;
