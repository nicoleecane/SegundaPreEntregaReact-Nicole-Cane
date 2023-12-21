import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Form } from "../Form/Form";

export const Order = () => {
  const { cartItems, totalCartItems } = useContext(CartContext);

  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
  });

  const handleFormChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2 className="text-primary m-2">Datos del cliente</h2>

      <Form
        userData={userData}
        onFormChange={handleFormChange}
        cartItems={cartItems}
        total={totalCartItems}
      />
    </div>
  );
};
