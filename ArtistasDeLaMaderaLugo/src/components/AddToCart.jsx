import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { addToCartService } from "../services/index";
import TokenCaducado from "./TokenCaducado";

function AddToCart({
  tokenCaducadoVisible,
  setTokenCaducadoVisible,
  productId,
  onAddToCart,
}) {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Agregar a localStorage si no está autenticado
  const addToLocalStorageCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem("tempCart")) || [];
    cart.push(productId);
    localStorage.setItem("tempCart", JSON.stringify(cart));
  };

  const handleAddToCart = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (token) {
        const response = await addToCartService(productId, token);
        setSuccess(response.message);
        onAddToCart();
      } else {
        addToLocalStorageCart(parseInt(productId));
        onAddToCart();
        setSuccess("Producto añadido temporalmente a tu carrito");
      }
    } catch (error) {
      if (error.message === "Token Caducado") {
        setTokenCaducadoVisible(true);
      }
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <button
        className="add-to-cart-button"
        onClick={handleAddToCart}
        disabled={loading}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="bi bi-cart-plus-fill"
          viewBox="0 0 20 20"
        >
          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
        </svg>
        Guardar
      </button>
      {success && <p className="success-message">{success}</p>}
      {loading && <p>Cargando...</p>}
      {error && <p className="error-message">{error}</p>}
      {tokenCaducadoVisible && <TokenCaducado />}
    </div>
  );
}

export default AddToCart;
