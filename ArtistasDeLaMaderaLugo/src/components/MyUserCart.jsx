import { useContext, useEffect, useState } from "react";
import { getMyUserCartService } from "../services/index";
import { AuthContext } from "../context/AuthContext";
import ProductsList from "./productsList";

function MyUserCart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const cartData = await getMyUserCartService(token);
        setCartProducts(cartData.products);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, []);

  return (
    <div>
      <h1>Tu Carrito de Compras</h1>
      {loading ? (
        <p>Cargando productos en el carrito...</p>
      ) : (
        <div className="cart-products">
          {cartProducts ? (
            <ProductsList products={cartProducts} />
          ) : (
            <p>Tu carrito está vacío.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MyUserCart;
