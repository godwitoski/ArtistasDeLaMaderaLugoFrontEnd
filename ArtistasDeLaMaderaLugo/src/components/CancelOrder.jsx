import React, { useState, useContext } from "react";
import { cancelOrderService } from "../services/index";
import { AuthContext } from "../context/AuthContext";
import TokenCaducado from "./TokenCaducado";

function CancelOrder({
  tokenCaducadoVisible,
  setTokenCaducadoVisible,
  productId,
  onProductsUpdated,
}) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { token, cancelledProducts, setCancelledProducts } =
    useContext(AuthContext);

  const handleCancelClick = async () => {
    try {
      const response = await cancelOrderService(productId, token);

      if (response.status === "OK") {
        setSuccess("Venta cancelada");
        setCancelledProducts([
          ...cancelledProducts,
          {
            product_id: response.data[0].product_id,
            user_id: response.data[0].user_id,
          },
        ]);
      }
    } catch (error) {
      if (error.message === "Token Caducado") {
        setTokenCaducadoVisible(true);
      }
      setError(error.message);
    }

    setTimeout(() => {
      setError(null);
      setSuccess(null);
      onProductsUpdated();
    }, 2000);
  };

  return (
    <>
      <button onClick={handleCancelClick}>Cancelar venta</button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Cancelando pedido</p>}
      {tokenCaducadoVisible && <TokenCaducado />}
    </>
  );
}

export default CancelOrder;
