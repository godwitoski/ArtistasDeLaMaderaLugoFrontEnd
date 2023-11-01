import { useState, useContext } from "react";
import { editUserDataService } from "../services/index";
import { AuthContext } from "../context/AuthContext";

export const EditProfile = () => {
  const { token, userName, logout, name, emailAuth, phone, address } =
    useContext(AuthContext);
  const [email, setEmail] = useState(emailAuth);
  const [nameEdit, setNameEdit] = useState(name);
  const [username, setUsername] = useState(userName);
  const [phoneEdit, setPhoneEdit] = useState(phone);
  const [addressEdit, setAddressEdit] = useState(address);
  const [pwd, setPwd] = useState("");
  const [pwdNew, setPwdNew] = useState("");
  const [repeatpwd, setRepeatPwd] = useState("");
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
        address: addressEdit,
        phone: phoneEdit,
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
    <section className="edit-profile">
      <div>
        <h1>Editar perfil:</h1>
        <div className="user-data">
          <form className="edit-user-data" onSubmit={handleEditForm}>
            <div>
              <fieldset>
                <label htmlFor="name">Nombre * </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={nameEdit}
                  required
                  onChange={(e) => setNameEdit(e.target.value)}
                />
              </fieldset>
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
                  type="text"
                  id="username"
                  value={username}
                  name="username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="phone">Teléfono </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phoneEdit}
                  placeholder="Añade tu móvil de contacto"
                  onChange={(e) => setPhoneEdit(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="address">Dirección </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Añade domicilio"
                  value={addressEdit}
                  onChange={(e) => setAddressEdit(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="pwd">Contraseña * </label>
                <input
                  type="password"
                  id="pwd"
                  name="pwd"
                  placeholder="Escribe tu contraseña"
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
                  placeholder="contraseña nueva"
                  onChange={(e) => setPwdNew(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="repeatpwd">Confirmar nueva contraseña: </label>
                <input
                  type="password"
                  id="repeatNewPwd"
                  placeholder="Repite la contraseña"
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
