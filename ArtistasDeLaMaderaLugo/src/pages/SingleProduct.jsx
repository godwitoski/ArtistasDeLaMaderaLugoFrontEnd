import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleProductService } from "../services/index";

const SingleProduct = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getSingleProductService(productId);
        setProduct(productData[0]);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div>
      {product ? (
        <div className="product-detail">
          <div className="product-image">
            {product.photos && product.photos.length > 0
              ? product.photos.map((photo) => (
                  <img
                    key={photo.id}
                    src={`${import.meta.env.VITE_APP_BACKEND}/uploads/photos/${
                      product.name
                    }/${photo.photo}`}
                    alt={product.name}
                  />
                ))
              : null}
          </div>
          <div className="product-info">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>
              Precio: {product.price ? product.price : "Precio no disponible"}
            </p>
            <p>Material: {product.type}</p>
            <p>
              Publicado el:{" "}
              {product.date
                ? new Date(product.date).toLocaleDateString()
                : "Fecha no disponible"}
            </p>
          </div>
        </div>
      ) : (
        <p>Cargando producto...</p>
      )}
    </div>
  );
};

export default SingleProduct;
