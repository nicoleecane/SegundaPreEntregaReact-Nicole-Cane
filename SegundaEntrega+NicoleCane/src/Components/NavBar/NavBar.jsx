import { Link } from "react-router-dom";
import { CartWidget } from "../CartWidget/CartWidget";

export const NavBar = () => {
  return (
    <nav className="d-flex justify-content-around p-4">
      <figure>
        <figcaption>
          <img
            className="img_nav"
            src="https://th.bing.com/th/id/OIP.KMGIz8uPRy8IS43_a8RLNQHaIA?w=152&h=180&c=7&r=0&o=5&pid=1.7"
            alt=""
            style={{ width: "90px" }}
          />
          MangaAttack
        </figcaption>
      </figure>
      <div>
        <Link to="/">
          <button className="btn  btn-danger mx-2">Home</button>
        </Link>
        <Link to={"/category/temporada1"}>
          <button className="btn btn-danger mx-2">Temporada 1</button>
        </Link>
        <Link to={"/category/temporada2"}>
          <button className="btn btn-danger mx-2">Temporada 2</button>
        </Link>
        <Link to={"/category/temporada3"}>
          <button className="btn btn-danger mx-2">Temporada 3</button>
        </Link>
        <Link to={"/category/temporada4"}>
          <button className="btn btn-danger mx-2">Temporada 4</button>
        </Link>
      </div>
      <Link to={"/Cart"}>
        <CartWidget />
      </Link>
    </nav>
  );
};
