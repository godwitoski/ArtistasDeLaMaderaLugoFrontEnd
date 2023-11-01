import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { removeToCartService } from "../services/index";

function RemoveToMyCart({ productId, onRemove }) {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRemoveToCart = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (token) {
        const response = await removeToCartService(productId, token);
        setSuccess(response.message);
        onRemove();
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleRemoveToCart} disabled={loading}>
        ❌
      </button>
      {success && <p className="success-message">{success}</p>}
      {loading && <p>Cargando...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default RemoveToMyCart;
