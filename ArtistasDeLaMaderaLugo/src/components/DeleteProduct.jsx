import React, { useContext, useState } from "react";
import { deleteProductService } from "../services/index";
import { AuthContext } from "../context/AuthContext";
import TokenCaducado from "./TokenCaducado";
import { useNavigate } from "react-router-dom";

const DeleteProduct = ({
  productId,
  tokenCaducadoVisible,
  setTokenCaducadoVisible,
}) => {
  const { token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await deleteProductService(productId, token);
      if ((response.status = 200)) {
        setMessage(response.message);
        navigate("/");
      }
    } catch (error) {
      if (error.message === "Token Caducado") {
        setTokenCaducadoVisible(true);
      }
      setError(error.message);
    }
  };

  return (
    <>
      <button className="delete-product-button" onClick={handleDelete}>
        Eliminar
      </button>

      {error ? <p className="error-message">{error}</p> : null}
      {message ? <p>{message}</p> : null}
      {tokenCaducadoVisible && <TokenCaducado />}
    </>
  );
};

export default DeleteProduct;
