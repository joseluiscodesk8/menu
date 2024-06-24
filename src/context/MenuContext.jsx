import React, { createContext, useContext, useState, useEffect } from 'react';

const MenuContext = createContext();

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const storedMenuItems = localStorage.getItem('menuItems');
    if (storedMenuItems) {
      setMenuItems(JSON.parse(storedMenuItems));
    }
    const storedOrderItems = localStorage.getItem('orderItems');
    if (storedOrderItems) {
      setOrderItems(JSON.parse(storedOrderItems));
    }
  }, []);

  const addToMenu = (item) => {
    const existingItemIndex = menuItems.findIndex(
      (menuItem) => menuItem.id === item.id && menuItem.origin === item.origin
    );

    if (existingItemIndex !== -1) {
      const updatedMenu = [...menuItems];
      updatedMenu[existingItemIndex].quantity += item.quantity;
      setMenuItems(updatedMenu);
      localStorage.setItem('menuItems', JSON.stringify(updatedMenu));
    } else {
      const updatedMenu = [...menuItems, item];
      setMenuItems(updatedMenu);
      localStorage.setItem('menuItems', JSON.stringify(updatedMenu));
    }
  };

  const removeFromMenu = (item) => {
    const updatedMenu = menuItems.filter(
      (menuItem) => !(menuItem.id === item.id && menuItem.origin === item.origin)
    );
    setMenuItems(updatedMenu);
    localStorage.setItem('menuItems', JSON.stringify(updatedMenu));
  };

  const addToOrder = (item) => {
    const existingItemIndex = orderItems.findIndex(
      (orderItem) => orderItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      const updatedOrders = [...orderItems];
      updatedOrders[existingItemIndex].quantity += 1;
      setOrderItems(updatedOrders);
      localStorage.setItem('orderItems', JSON.stringify(updatedOrders));
    } else {
      const updatedOrders = [...orderItems, { ...item, quantity: 1 }];
      setOrderItems(updatedOrders);
      localStorage.setItem('orderItems', JSON.stringify(updatedOrders));
    }
  };

  const removeFromOrder = (item) => {
    const existingItemIndex = orderItems.findIndex(
      (orderItem) => orderItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      const updatedOrders = [...orderItems];
      if (updatedOrders[existingItemIndex].quantity > 1) {
        updatedOrders[existingItemIndex].quantity -= 1;
      } else {
        updatedOrders.splice(existingItemIndex, 1);
      }
      setOrderItems(updatedOrders);
      localStorage.setItem('orderItems', JSON.stringify(updatedOrders));
    }
  };

  const menuCount = menuItems.length;

  return (
    <MenuContext.Provider value={{ menuItems, addToMenu, removeFromMenu, addToOrder, removeFromOrder, orderItems, menuCount }}>
      {children}
    </MenuContext.Provider>
  );
};


// import React, { createContext, useContext, useState, useEffect } from 'react';

// const MenuContext = createContext();

// export const useMenu = () => {
//   const context = useContext(MenuContext);
//   if (!context) {
//     throw new Error("useMenu must be used within a MenuProvider");
//   }
//   return context;
// };

// export const MenuProvider = ({ children }) => {
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     const storedMenuItems = localStorage.getItem('menuItems');
//     if (storedMenuItems) {
//       setMenuItems(JSON.parse(storedMenuItems));
//     }
//   }, []);

//   const addToMenu = (item) => {
//     const existingItemIndex = menuItems.findIndex(
//       (menuItem) => menuItem.id === item.id && menuItem.origin === item.origin
//     );

//     if (existingItemIndex !== -1) {
//       const updatedMenu = [...menuItems];
//       updatedMenu[existingItemIndex].quantity += item.quantity;
//       setMenuItems(updatedMenu);
//       localStorage.setItem('menuItems', JSON.stringify(updatedMenu));
//     } else {
//       const updatedMenu = [...menuItems, item];
//       setMenuItems(updatedMenu);
//       localStorage.setItem('menuItems', JSON.stringify(updatedMenu));
//     }
//   };

//   const removeFromMenu = (item) => {
//     const updatedMenu = menuItems.filter(
//       (menuItem) => !(menuItem.id === item.id && menuItem.origin === item.origin)
//     );
//     setMenuItems(updatedMenu);
//     localStorage.setItem('menuItems', JSON.stringify(updatedMenu));
//   };

//   const menuCount = menuItems.length;

//   return (
//     <MenuContext.Provider value={{ menuItems, setMenuItems, addToMenu, removeFromMenu, menuCount }}>
//       {children}
//     </MenuContext.Provider>
//   );
// };
