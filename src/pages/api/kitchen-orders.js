import defineKitchenItemModel from '../../../models/KitchenItem';
import sequelize from '../../../db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { section } = req.query;

      if (!section) {
        return res.status(400).json({ error: 'Número de sección es requerido' });
      }

      const tableName = `kitchen_table_${section}`;

      // Comprobar si la tabla existe
      const tableExists = await sequelize.query(
        `SELECT to_regclass('${tableName}')`
      );

      if (tableExists[0][0].to_regclass === null) {
        return res.status(200).json([]); // Devolver un array vacío si la tabla no existe
      }

      // Definir el modelo para la tabla específica
      const KitchenItem = defineKitchenItemModel(tableName);

      // Obtener los elementos de la tabla específica
      const orders = await KitchenItem.findAll();

      // Transformar los datos en un formato adecuado
      const formattedOrders = orders.map(order => ({
        orderNumber: order.numeroMesa,
        items: [
          {
            name: order.nombre,
            quantity: order.cantidad,
          },
        ],
      }));

      res.status(200).json(formattedOrders);
    } catch (err) {
      console.error('Error al obtener las órdenes:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}