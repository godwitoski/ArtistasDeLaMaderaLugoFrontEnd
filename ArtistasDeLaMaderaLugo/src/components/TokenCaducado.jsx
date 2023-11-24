import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function TokenCaducado() {
  const { logout } = useContext(AuthContext);
  const [tokenCaducado, setTokenCaducado] = useState(true);

  const navigate = useNavigate();

  const closeModal = () => {
    setTokenCaducado(false);
  };

  return (
    <>
      {tokenCaducado && (
        <section className="modal-token">
          <div className="modal-token-content token-caducado">
            <h2>Tu sesión ha expirado.</h2>
            <p>Deberás iniciar sesión para continuar</p>
            <div className="buttons-logout-modal">
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  logout();
                  closeModal();
                  navigate("/login");
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default TokenCaducado;
