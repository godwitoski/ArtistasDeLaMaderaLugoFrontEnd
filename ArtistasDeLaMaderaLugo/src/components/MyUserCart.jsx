import { useContext, useEffect, useState } from "react";
import { getMyUserCartService } from "../services/index";
import { AuthContext } from "../context/AuthContext";
import ProductsList from "./ProductsList";
import { Link } from "react-router-dom";

function MyUserCart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { token, setCartCount } = useContext(AuthContext); // Agrega setCartCount desde el contexto

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const cartData = await getMyUserCartService(token);
        setCartProducts(cartData.products);

        // Calcula el número de productos en el carrito y establece cartCount
        setCartCount(cartData.products ? cartData.products.length : 0);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, [token, setCartProducts]);

  return (
    <div>
      <h1>Tu Carrito de Compras</h1>
      {loading ? (
        <p>Cargando productos en el carrito...</p>
      ) : (
        <div className="cart-products">
          {cartProducts ? (
            <>
              <ProductsList products={cartProducts} />
              <Link to={"/products/sendOrder"}>Continuar con la compra</Link>
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
