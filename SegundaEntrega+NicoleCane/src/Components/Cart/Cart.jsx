import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Swal from 'sweetalert2';

const CartItem = ({ item, updateItemQuantity, removeItem }) => {
  const { id, name, price, quantity, subTotal } = item;

  return (
    <div>
      <p>Nombre: {name}</p>
      <p>Precio Unitario: ${price}</p>
      <p>Cantidad: {quantity}</p>
      <p>Sub total: ${subTotal}</p>
      <div>
        <button onClick={() => updateItemQuantity(id, quantity - 1)} disabled={quantity === 1}>Reducir</button>
        <button onClick={() => updateItemQuantity(id, quantity + 1)}>Incrementar</button>
      </div>
      <button onClick={() => removeItem(id)}>Eliminar</button>
    </div>
  );
};

export const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeItem, updateItemQuantity } = useContext(CartContext);

  const totalCartItems = cartItems.reduce((total, item) => total + item.subTotal, 0);

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) {
      Swal.fire({
        title: "Carrito de compras vacio",
        text: "Por favor, revise que todos los productos fueran agregados",
        icon: "error"
      });
    } else {
      navigate("/confirmar-compra");
    }
  };

  return (
    <div>
      <h2>Carrito</h2>
      <div>
        {cartItems.map((item) => (
          <CartItem 
            key={item.id} 
            item={item} 
            updateItemQuantity={updateItemQuantity} 
            removeItem={removeItem} 
          />
        ))}
      </div>
      <p>Suma total del carrito ${totalCartItems}</p>
      <button onClick={handleConfirmOrder} disabled={cartItems.length === 0}>Confirmar Compra</button>
    </div>
  );
};

