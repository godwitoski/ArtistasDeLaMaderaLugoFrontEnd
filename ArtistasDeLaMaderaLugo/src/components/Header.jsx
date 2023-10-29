import { useContext, useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <nav className="nav-header">
        <div className="nav-menu">
          <h1>
            <Link to="/">Pagina principal</Link>
          </h1>
          <Link to="/login">
            <button>ir a login</button>
          </Link>
          <Link to="/products/addNew">
            <button>Add product - admin</button>
          </Link>
          <Link to="/users">
            <button>Ver usuarios</button>
          </Link>
          <Link to="/register">
            <button>Ir a register</button>
          </Link>
          <Link to="/user/mycart">
            <button>🛒</button>
          </Link>

          <Link to="/user/myorders">
            <button>📦Pedidos</button>
          </Link>

          <Link to="/user/myuser">
            <button>🙍🏽‍♂️🙍🏽‍♀️</button>
          </Link>
        </div>
      </nav>
    </>
  );
};
