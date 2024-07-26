const sequelize = require('./db');
const MenuItem = require('./models/MenuItem');
const menu = require('./src/data/menu');

const insertMenuItem = async (item) => {
  try {
    await MenuItem.upsert(item);
  } catch (err) {
    console.error('Error inserting or updating item:', err);
  }
};

const insertMenuItems = async () => {
  try {
    await sequelize.sync(); // Esto crea las tablas si no existen
    for (const item of menu.items) {
      await insertMenuItem(item);
    }
    console.log('All items inserted or updated');
  } catch (err) {
    console.error('Error syncing database:', err);
  } finally {
    await sequelize.close();
  }
};

insertMenuItems();