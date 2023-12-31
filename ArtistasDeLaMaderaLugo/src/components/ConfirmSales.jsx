import React, { useState, useContext } from "react";
import { moveProductToSalesService } from "../services/index";
import { AuthContext } from "../context/AuthContext";
import TokenCaducado from "./TokenCaducado";

function ConfirmSales({
  productId,
  onProductsUpdated,
  tokenCaducadoVisible,
  setTokenCaducadoVisible,
}) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { token } = useContext(AuthContext);

  const handleAcceptClick = async () => {
    // Limpiar los mensajes de éxito y error

    try {
      const response = await moveProductToSalesService(productId, token);

      if (response.status === "OK") {
        setSuccess("Producto vendido con éxito");
      }
    } catch (error) {
      if (error.message === "Token Caducado") {
        setTokenCaducadoVisible(true);
      }
      setError(error.message);
    }

    // Llamar a onProductsUpdated después de limpiar los mensajes
    setTimeout(() => {
      setError(null);
      setSuccess(null);
      onProductsUpdated();
    }, 2000);
  };

  return (
    <>
      <button onClick={handleAcceptClick}>vender producto</button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      {tokenCaducadoVisible && <TokenCaducado />}
    </>
  );
}

export default ConfirmSales;
