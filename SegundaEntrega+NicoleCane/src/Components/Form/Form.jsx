import { useContext, useState } from "react";
import { FirebaseContext } from "../../context/FirebaseContext";
import { CartContext } from "../../context/CartContext";

export const Form = ({ cartItems, total }) => {
  const { addOrderDB } = useContext(FirebaseContext, CartContext);
  const { clearCartItems, setTotalQuantity } = useContext(CartContext);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [orderInfo, setOrderInfo] = useState(null);

  const handleForm = async (e) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      setEmailError("El correo de confirmación no coincide con el original");
      return;
    }
    setEmailError("");

    const userData = { name, surname, phone, email };
    const orderId = await addOrderDB(cartItems, userData, total);

    setOrderInfo({
      orderId,
      items: cartItems,
      total,
      userData,
    });

    clearCartItems();
    setTotalQuantity(0);

    setName("");
    setSurname("");
    setPhone("");
    setEmail("");
    setConfirmEmail("");
  };

  console.log("cartItems in Form before submission:", cartItems);

  return (
    <div>
      <form className="p-4" onSubmit={handleForm}>
        <div className="mb-3">
          <label htmlFor="name" className="carrito">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="surname" className="carrito">
            Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="carrito">
            Teléfono
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="carrito">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${emailError && "is-invalid"}`}
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
          />
        </div>

        <label htmlFor="confirmEmail" className="carrito">
          Confirmar Email
        </label>
        <input
          type="email"
          className={`form-control ${emailError && "is-invalid"}`}
          id="confirmEmail"
          value={confirmEmail}
          onChange={(e) => {
            setConfirmEmail(e.target.value);
            setEmailError("");
          }}
        />
        {emailError && <div className="invalid-feedback">{emailError}</div>}
         
         
        <button type="submit" className="btn btn-danger m-2">
          Finalizar compra
        </button>
        
      </form>

      {orderInfo && (
        <div
          className="alert alert-success mt-3"
          role="alert"
          style={{ width: "40%" }}
        >
          <h4 className="alert-heading">¡Compra realizada con éxito!</h4>
          <p>
            Tu orden con ID número {orderInfo.orderId} ha sido procesada.
            <br></br>
            <br></br>
            Detalles de la compra:
          </p>
          <ul>
            {orderInfo.items.map((item) => (
              <li key={item.id}>
                {item.name} - {item.quantity} x ${item.price} = $
                {item.quantity * item.price}
              </li>
            ))}
          </ul>
          <b>
            Total de la compra: $
            {orderInfo.items.reduce(
              (total, item) => total + item.quantity * item.price,
              0
            )}
          </b>
        </div>
      )}
    </div>
  );
};
