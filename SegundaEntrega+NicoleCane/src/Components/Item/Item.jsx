import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export const Item = ({ id, name, img, description }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { addItem } = useCart();
  const onAdd = (items) => {
    addItem(
      {
        id,
        name,
        price,
      },
      items
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="border m-2">
      <div className="card c_b_bg">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <img src={img} width="90" alt="" />
          <p className="card-text"> {description} </p>
          <Link to={`/item/${id}`}>
            <button className="btn btn-outline-danger detail_bg">
              Detalles
            </button>
          </Link>
        </div>
       
      </div>
      
    </div>
  );
};


