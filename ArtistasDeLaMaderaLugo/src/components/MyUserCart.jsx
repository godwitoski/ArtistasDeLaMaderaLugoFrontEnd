import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ProductsList from "./ProductsList";
import { getMyUserCartService } from "../services/index";

function MyUserCart() {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { token, setCartCount } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
      navigate("/login");
      return;
    }

    const fetchCartProducts = async () => {
      try {
        const cartData = await getMyUserCartService(token);
        setCartProducts(cartData.products);

        setCartCount(cartData.products ? cartData.products.length : 0);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, [token, navigate]);

  return (
    <div className="cartPage">
      <h1>Tu Carrito de Compras</h1>
      {loading ? (
        <p>Cargando productos en el carrito...</p>
      ) : (
        <div className="cart-products">
          {cartProducts ? (
            <>
              <ProductsList products={cartProducts} />
              <Link to="/products/sendOrder">
                <button>Continuar con la compra</button>
              </Link>
            </>
          ) : (
            <p>Tu carrito está vacío.</p>
          )}
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default MyUserCart;
