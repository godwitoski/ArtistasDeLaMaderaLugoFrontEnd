import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { deletesingleorder } from "../services/index";

function DeleteSingleOrder({ productId }) {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRemove = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await deletesingleorder(productId, token);
      setSuccess(response.message);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleRemove} disabled={loading}>
        Eliminar
      </button>
      {success && <p className="success-message">{success}</p>}
      {loading && <p>Cargando...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default DeleteSingleOrder;
