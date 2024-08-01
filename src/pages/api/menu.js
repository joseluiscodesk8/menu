import sequelize from '../../../db';
import MenuItem from '../../../models/MenuItem';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await sequelize.sync();
      const menuItems = await MenuItem.findAll();
      res.status(200).json(menuItems);
    } catch (err) {
      console.error('Error fetching menu items:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}