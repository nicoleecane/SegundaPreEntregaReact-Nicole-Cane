import { useCart } from "../../context/CartContext";
import { ItemCount } from "../ItemCount/ItemCount";

export const ItemDetail = ({id, name, category, description, img, price, stock }) => {

  const {addItem} = useCart();

    const onAdd = (items) => {
        addItem (
          id,
          name,
          img,
          price,
          category,
          description
        )
      }

  return (
    <div className="border m-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title" >{name}</h5>
          <img src={img} alt="" />
          <p className="card-text"> {description} </p>
          <p>Precio: {price} </p>
          <ItemCount stock={stock} onAdd={onAdd} />
        </div>
      </div>
    </div>
  );
};
