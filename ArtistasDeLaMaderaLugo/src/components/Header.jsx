import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Header = () => {
  const { logout, role } = useContext(AuthContext);
  const { cartCount } = useContext(AuthContext);

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
          <span style={{ border: "1px solid red", padding: "10px" }}>
            <Link to="/products/addNew">
              <button>Add product - admin</button>
            </Link>
            <Link to="/users">
              <button>Ver usuarios - admin</button>
            </Link>
            <Link to="/products/sales">
              <button>Ventas - admin</button>
            </Link>
            <Link to="/products/orders">
              <button>Ordenes pendientes</button>
            </Link>
          </span>

          <Link to="/register">
            <button>Ir a register</button>
          </Link>
          <Link to="/user/mycart">
            <button>Carrito:{cartCount}</button>
          </Link>
          <Link to="/user/myorders">
            <button>📦Pedidos</button>
          </Link>
          <Link to="/user/myuser">
            <button>🙍🏽‍♂️🙍🏽‍♀️</button>
          </Link>
          <Link to="/products/search">
            <button>🔎🔍</button>
          </Link>

          <button onClick={logout}>cerrar sesión</button>
        </div>
      </nav>
    </>
  );
};
