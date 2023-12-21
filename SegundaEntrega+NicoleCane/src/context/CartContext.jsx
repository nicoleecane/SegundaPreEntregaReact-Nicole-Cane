import React, { createContext, useContext, useEffect, useReducer } from 'react';

export const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return context;
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (existingIndex >= 0) {
        const cartItemsCopy = [...state.cartItems];
        cartItemsCopy[existingIndex].quantity += Number(action.payload.quantity);
        cartItemsCopy[existingIndex].subTotal = cartItemsCopy[existingIndex].quantity * cartItemsCopy[existingIndex].price;
        return { ...state, cartItems: cartItemsCopy };
      } else {
        const newItem = { ...action.payload, quantity: Number(action.payload.quantity), subTotal: Number(action.payload.quantity) * action.payload.price };
        return { ...state, cartItems: [...state.cartItems, newItem] };
      }
    case 'REMOVE_ITEM':
      return { ...state, cartItems: state.cartItems.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return { ...state, cartItems: state.cartItems.map(item => item.id === action.payload.id ? { ...item, quantity: Math.max(action.payload.newQuantity, 0), subTotal: Math.max(action.payload.newQuantity, 0) * item.price } : item) };
    case 'CALCULATE_TOTALS':
      const total = state.cartItems.reduce((acc, item) => acc + item.subTotal, 0);
      const totalQuantity = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
      return { ...state, totalCartItems: total, totalQuantity: totalQuantity };
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    totalCartItems: 0,
    totalQuantity: 0
  });

  useEffect(() => {
    dispatch({ type: 'CALCULATE_TOTALS' });
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const contextValue = {
    ...state,
    addItem: item => dispatch({ type: 'ADD_ITEM', payload: item }),
    removeItem: id => dispatch({ type: 'REMOVE_ITEM', payload: id }),
    updateItemQuantity: (id, newQuantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, newQuantity } }),
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};


