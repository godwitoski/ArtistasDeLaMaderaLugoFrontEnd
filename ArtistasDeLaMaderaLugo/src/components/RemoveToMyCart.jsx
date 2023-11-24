import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { removeToCartService } from "../services/index";
import TokenCaducado from "./TokenCaducado";

function RemoveToMyCart({
  productId,
  onRemove,
  tokenCaducadoVisible,
  setTokenCaducadoVisible,
}) {
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
      if (error.message === "Token Caducado") {
        setTokenCaducadoVisible(true);
      }
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleRemoveToCart} disabled={loading}>
        Eliminar de mi carrito
      </button>
      {success && <p className="success-message">{success}</p>}
      {loading && <p>Cargando...</p>}
      {error && <p className="error-message">{error}</p>}
      {tokenCaducadoVisible && <TokenCaducado />}
    </div>
  );
}

export default RemoveToMyCart;
