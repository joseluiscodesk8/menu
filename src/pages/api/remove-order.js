import defineKitchenItemModel from '../../../models/KitchenItem';
import sequelize from '../../../db';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { section, orderNumber } = req.query;

      if (!section || !orderNumber) {
        return res.status(400).json({ error: 'Section number and order number are required' });
      }

      const tableName = `kitchen_table_${section}`;

      // Definir el modelo para la tabla específica
      const KitchenItem = defineKitchenItemModel(tableName);

      // Sincronizar la base de datos (crear la tabla si no existe)
      await sequelize.sync();

      // Eliminar el elemento de la tabla específica
      await KitchenItem.destroy({
        where: {
          numeroMesa: orderNumber
        }
      });

      res.status(200).json({ message: 'Order removed from kitchen' });
    } catch (err) {
      console.error('Error removing order:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
