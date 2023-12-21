import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Swal from "sweetalert2";

const CartItem = ({ item, updateItemQuantity, removeItem }) => {
  const { id, name, price, quantity, subTotal } = item;

  return (
    <div>
      <p>Nombre: {name}</p>
      <p>Precio Unitario: ${price}</p>
      <p>Cantidad: {quantity}</p>
      <p>Sub total: ${subTotal}</p>
      <div>
        <button
          className="btn btn-outline-danger "
          onClick={() => updateItemQuantity(id, quantity - 1)}
          disabled={quantity === 1}
        >
          Reducir
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => updateItemQuantity(id, quantity + 1)}
        >
          Incrementar
        </button>
      </div>
      <button className="btn btn-outline-danger" onClick={() => removeItem(id)}>
        Eliminar
      </button>
    </div>
  );
};

export const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeItem, updateItemQuantity } = useContext(CartContext);

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.subTotal,
    0
  );

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) {
      Swal.fire({
        title: "Carrito de compras vacio",
        text: "Por favor, revise que todos los productos fueran agregados",
        icon: "error",
      });
    } else {
      navigate("/confirmar-compra");
    }
  };

  return (
    <div>
      <h2 className="carrito">Carrito</h2>
      <div className="carrito">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            updateItemQuantity={updateItemQuantity}
            removeItem={removeItem}
          />
        ))}
      </div>
      <p className="carrito">Suma total del carrito ${totalCartItems}</p>
      <button
        className="btn btn-outline-danger"
        onClick={handleConfirmOrder}
        disabled={cartItems.length === 0}
      >
        Confirmar Compra
      </button>
    </div>
  );
};
