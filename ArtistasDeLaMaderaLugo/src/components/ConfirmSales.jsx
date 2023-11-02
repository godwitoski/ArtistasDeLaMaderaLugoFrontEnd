import React, { useState, useContext } from "react";
import { moveProductToSalesService } from "../services/index"; // Importa el servicio adecuado
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ConfirmSales({ productId }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { token } = useContext(AuthContext);

  const handleAcceptClick = async () => {
    try {
      const response = await moveProductToSalesService(productId, token);

      if (response.status === "OK") {
        setSuccess("Producto vendido con éxito");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <button onClick={handleAcceptClick}>vender producto</button>
      {/* <button onClick={onCancel}>Cancelar</button> */}
      {error && <p className="error-message">{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
}

export default ConfirmSales;
