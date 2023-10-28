import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    type: "",
  });
  const [photos, setPhotos] = useState([]);
  const [message, setMessage] = useState("");
  const { token } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setPhotos(filesArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("type", product.type);

    for (let i = 0; i < photos.length; i++) {
      formData.append("photos", photos[i]);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND}/products/addNew`,
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
          },
          body: formData,
        }
      );

      if (response.status === 200) {
        setMessage("Producto agregado correctamente.");
      } else {
        setMessage("Hubo un error, comprueba los datos");
      }
    } catch (error) {
      setMessage("Hubo un error, comprueba los datos");
    }
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre del Producto:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Descripción del producto:</label>
          <textarea
            id="description"
            name="description"
            required
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Precio:</label>
          <input
            placeholder="Ejemplo: 323.21"
            type="text"
            id="price"
            name="price"
            required
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="type">Material:</label>
          <input
            placeholder="Tipo de material"
            type="text"
            id="type"
            name="type"
            required
            value={product.type}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="photos">Selecciona las fotos del producto</label>
          <input
            placeholder="Selecciona una o más fotos"
            type="file"
            id="photos"
            name="photos"
            multiple
            required
            onChange={handlePhotoChange}
          />
        </div>
        <button type="submit">Agregar Producto</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddProduct;
