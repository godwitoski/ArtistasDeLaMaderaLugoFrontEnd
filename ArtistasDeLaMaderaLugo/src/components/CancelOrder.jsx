import React, { useState, useContext } from "react";
import { cancelOrderService } from "../services/index";
import { AuthContext } from "../context/AuthContext";

function CancelOrder({ productId, onProductsUpdated }) {
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
        console.log(response.data, response.message);
      }
    } catch (error) {
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
      {success && <p className="success-message">{success}</p>}
    </>
  );
}

export default CancelOrder;
