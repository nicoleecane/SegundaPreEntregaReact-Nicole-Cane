import React, { useState } from "react";

export const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);

  const increment = () => {
    if (count < stock) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const decrement = () => {
    if (count > initial) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <div className="d-flex flex-column col-2 justify-content-center align-content-center p-4">
      <div>
        <button
          className="btn btn-outline-danger mx-3"
          onClick={increment}
          disabled={count >= stock}
          aria-label="Increase Quantity"
        >
          +
        </button>
        <strong>{count}</strong>
        <button
          className="btn btn-outline-danger mx-3"
          onClick={decrement}
          disabled={count <= initial}
          aria-label="Decrease Quantity"
        >
          -
        </button>
      </div>
      {stock === 0 && <p>Producto agotado</p>}
      <button
        className="btn btn-outline-danger mt-2"
        onClick={() => onAdd(count)}
        disabled={stock === 0}
      >
        Agregar al carrito
      </button>
    </div>
  );
};
