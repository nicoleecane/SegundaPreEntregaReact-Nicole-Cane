import React, { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return context;
};

export const CartContextProvider = ({ children }) => {
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const [cartItems, setCartItems] = useState(storedCartItems);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const addItem = (item) => {
    const { id, quantity } = item;
    const index = cartItems.findIndex((product) => product.id === id);

    if (index !== -1) {
      const cartItemsCopy = [...cartItems];
      cartItemsCopy[index].quantity += Number(quantity);
      cartItemsCopy[index].subTotal = cartItemsCopy[index].quantity * cartItemsCopy[index].price;
      setCartItems(cartItemsCopy);
    } else {
      const newItem = {
        ...item,
        quantity: Number(quantity),
        subTotal: Number(quantity) * item.price,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const removeItem = (id) => {
    const filteredItems = cartItems.filter((item) => item.id !== id);
    setCartItems(filteredItems);
  };

  const updateItemQuantity = (id, newQuantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity, subTotal: newQuantity * item.price } : item
    );
    setCartItems(updatedItems);
  };

  const handleTotal = () => {
    const total = cartItems.reduce((acc, item) => acc + item.subTotal, 0);
    setTotalCartItems(total);
  };

  const handleTotalQuantity = () => {
    const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setTotalQuantity(total);
  };

  useEffect(() => {
    handleTotal();
    handleTotalQuantity();
    // Store to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const contextValue = {
    cartItems,
    totalCartItems,
    totalQuantity,
    addItem,
    removeItem,
    updateItemQuantity,
    // Include any other context state or functions you want to provide
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

