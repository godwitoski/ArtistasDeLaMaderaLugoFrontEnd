import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { addToCartService } from "../services/index";

function AddToCart({ productId, onAddToCart }) {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddToCart = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (token) {
        const response = await addToCartService(productId, token);
        setSuccess(response.message);
        // Llama a la función onAddToCart para incrementar el contador
        onAddToCart();
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleAddToCart} disabled={loading}>
        🛒
      </button>
      {success && <p className="success-message">{success}</p>}
      {loading && <p>Cargando...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default AddToCart;
