import {
  Cart,
  ItemDetailContainer,
  ItemListContainer,
  NavBar,
  Form,
  Order,
} from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartContextProvider } from "./context/CartContext";
import React from "react";
import { FirebaseContextProvider } from "./context/FirebaseContext";

export const App = () => {
  return (
    <BrowserRouter>
      <FirebaseContextProvider>
        <CartContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/category/:category" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/confirmar-compra" element={<Form />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </CartContextProvider>
      </FirebaseContextProvider>
    </BrowserRouter>
  );
};
