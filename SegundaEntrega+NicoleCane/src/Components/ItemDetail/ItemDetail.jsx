import React from 'react';
import { useCart } from "../../context/CartContext";
import { ItemCount } from "../ItemCount/ItemCount";

export const ItemDetail = ({ id, name, category, description, img, price, stock }) => {
  const { addItem } = useCart();

  const onAdd = (quantity) => {
    addItem({
      id,
      name,
      img,
      price: Number(price), // Ensure price is a number
      category,
      description,
      quantity: Number(quantity) // Parse quantity as a number
    });
  };

  return (
    <div className="border m-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <img src={img} alt={`Image of ${name}`} className="card-img-top" />
          <p className="card-text">{description}</p>
          <p>Precio: {price}</p>
          <ItemCount stock={stock} onAdd={onAdd} />
        </div>
      </div>
    </div>
  );
};

