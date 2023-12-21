import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { ItemList } from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { FirebaseContext } from "../../context/FirebaseContext";

export const ItemListContainer = () => {
  const { product, products, getProductsDB, getProductById, isLoading } =
    useContext(FirebaseContext);
  const { totalQuantity } = useContext(CartContext);

  const { category } = useParams();

  useEffect(() => {
    getProductsDB(category);
    getProductById(" ");
  }, [category]);

  return (
    <>
      {isLoading ? (
        <h2 className="msje"> Cargando productos... </h2>
      ) : (
        <ItemList products={products} />
      )}
    </>
  );
};
