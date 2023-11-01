import React, { useContext, useState } from "react";
import { deleteProductService } from "../services/index";
import { AuthContext } from "../context/AuthContext";

const DeleteProduct = ({ productId }) => {
  const { token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      const response = await deleteProductService(productId, token);
      if ((response.status = 200)) {
        setMessage(response.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <button onClick={handleDelete}>Eliminar</button>

      {error ? <p className="error-message">{error}</p> : null}
      {message ? <p>{message}</p> : null}
    </>
  );
};

export default DeleteProduct;
