import defineKitchenItemModel from "../../../models/KitchenItem";
import sequelize from "../../../db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { orderItems, tableNumber } = req.body;

      if (
        !Array.isArray(orderItems) ||
        orderItems.length === 0 ||
        !tableNumber
      ) {
        return res
          .status(400)
          .json({ error: "Invalid order items or table number" });
      }

      const tableName = `kitchen_table_${tableNumber}`;

      const KitchenItem = defineKitchenItemModel(tableName);

      await sequelize.sync();

      await KitchenItem.bulkCreate(
        orderItems.map((item) => ({
          imagen: item.image,
          nombre: item.name,
          precio: item.price,
          cantidad: item.quantity,
          numeroMesa: tableNumber,
        }))
      );

      res.status(200).json({ message: "Order sent to kitchen" });
    } catch (err) {
      console.error("Error sending order:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
