import {
  Cart,
  ItemDetailContainer,
  ItemListContainer,
  NavBar,
} from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartContextProvider } from "./context/CartContext";
import React from "react";

export const App = () => {
  return (
    
    <BrowserRouter>
      <CartContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:category" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartContextProvider>
    </BrowserRouter>
  );
};
