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

          <Link to="/register">
            <button>Ir a register</button>
          </Link>
        </div>
      </nav>
    </>
  );
};
