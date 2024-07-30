import React, { useState, useEffect } from 'react';
import { useMenu } from "../context/MenuContext";
import Link from "next/link";
import Head from "next/head";
import { motion, AnimatePresence } from 'framer-motion';

import styles from "../styles/index.module.scss";

const Kitchen = () => {
  const { removeOrderFromKitchen } = useMenu();
  const [selectedSection, setSelectedSection] = useState('');
  const [kitchenOrders, setKitchenOrders] = useState({});

  const sections = Array.from({ length: 14 }, (_, i) => (i + 1).toString());

  useEffect(() => {
    if (selectedSection) {
      const fetchOrders = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/kitchen-orders?section=${selectedSection}`);
          if (!response.ok) {
            throw new Error('Error al obtener las órdenes');
          }
          const data = await response.json();
          setKitchenOrders(prevOrders => ({
            ...prevOrders,
            [selectedSection]: data,
          }));
        } catch (error) {
          console.error('Error al obtener las órdenes:', error);
        }
      };

      fetchOrders();
    }
  }, [selectedSection]);

  const handleRemoveOrder = async (section, orderNumber) => {
    try {
      const response = await fetch(`/api/remove-order?section=${section}&orderNumber=${orderNumber}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la orden');
      }

      // Actualizar la lista de órdenes después de eliminar
      setKitchenOrders(prevOrders => ({
        ...prevOrders,
        [section]: prevOrders[section].filter(order => order.orderNumber !== orderNumber),
      }));
    } catch (error) {
      console.error('Error al eliminar la orden:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Head>
        <title>Órdenes de Cocina</title>
        <meta name="description" content="Generado por create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1 className={styles.titulo}>Órdenes de Cocina</h1>
      <main className={styles.kitchenContainer}>
        <section>
          {sections.map((section) => (
            <motion.button
              key={section}
              onClick={() => setSelectedSection(section)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Mesa {section}
            </motion.button>
          ))}
        </section>
        <AnimatePresence>
          {selectedSection && (
            <motion.div
              key={selectedSection}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={styles.itemsContainer}
            >
              {kitchenOrders[selectedSection] && kitchenOrders[selectedSection].length > 0 ? (
                kitchenOrders[selectedSection].map((order, index) => (
                  <motion.div key={index} variants={itemVariants} className={styles.items}>
                    <h2>Número de Orden: {order.orderNumber}</h2>
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <p>{item.name}</p>
                        <p>Cantidad: {item.quantity}</p>
                      </div>
                    ))}
                    <button onClick={() => handleRemoveOrder(selectedSection, order.orderNumber)}>Eliminar Orden</button>
                  </motion.div>
                ))
              ) : (
                <p>No hay ítems en el momento.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Link href={"/"}>Menú</Link>
    </>
  );
};

export default Kitchen;