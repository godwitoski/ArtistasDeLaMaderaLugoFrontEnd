import { useState, useContext } from "react";
import { editUserDataService } from "../services/index";
import { AuthContext } from "../context/AuthContext";

export const EditProfile = () => {
  const { token, userName, logout, name, emailAuth } = useContext(AuthContext);
  const [email, setEmail] = useState(emailAuth);
  const [nameEdit, setNameEdit] = useState(name);
  const [username, setUsername] = useState(userName);
  const [pwd, setPwd] = useState("");
  const [pwdNew, setPwdNew] = useState("");
  const [repeatpwd, setRepeatPwd] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleEditForm = async (e) => {
    e.preventDefault();
    setError("");

    if (pwdNew !== repeatpwd) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await editUserDataService({
        token,
        email,
        name: nameEdit,
        username,
        pwd,
        pwdNew,
        repeatpwd,
        address,
        phone,
      });
      if (response.status === "OK" && pwdNew && repeatpwd) {
        alert(
          "Se ha cambiado la contraseña. Serás redirigido a la página principal."
        );
        logout();
      }
      if (response.status === "OK" && !(pwdNew && repeatpwd)) {
        alert("Información de usuario actualizada correctamente.");
      }
      e.target.reset();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="edit-profile" onClick={handleOverlayClick}>
      <div>
        <h1>Editar perfil:</h1>
        <div className="user-data">
          <form className="edit-user-data" onSubmit={handleEditForm}>
            <div>
              <fieldset>
                <label htmlFor="email">Email * </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="username">Nombre de usuario * </label>
                <input
                  type="username"
                  id="username"
                  value={username}
                  name="username"
                  maxLength="12"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="address">Dirección * </label>
                <input
                  type="address"
                  id="address"
                  name="address"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="pwd">Contraseña * </label>
                <input
                  type="password"
                  id="pwd"
                  name="pwd"
                  required
                  onChange={(e) => setPwd(e.target.value)}
                />
              </fieldset>
            </div>
            <div>
              <fieldset>
                <label htmlFor="newPwd">Nueva Contraseña: </label>
                <input
                  type="password"
                  id="newPwd"
                  name="newPwd"
                  onChange={(e) => setPwdNew(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="repeatpwd">Confirmar nueva contraseña: </label>
                <input
                  type="password"
                  id="repeatNewPwd"
                  name="repeatNewPwd"
                  onChange={(e) => setRepeatPwd(e.target.value)}
                />
              </fieldset>
            </div>
            <div>
              <div>
                <button type="submit" className="main-button">
                  Guardar cambios
                </button>
              </div>
            </div>
          </form>
        </div>
        {error ? <p className="error-message">{error}</p> : null}
      </div>
    </section>
  );
};
