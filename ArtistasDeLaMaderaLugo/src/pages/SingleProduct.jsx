import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getSingleProductService } from "../services/index";
import { AuthContext } from "../context/AuthContext";
import AddToCart from "../components/AddToCart";
import Modal from "react-modal";
import { useProducts } from "../hooks/useProducts";
import TokenCaducado from "../components/TokenCaducado";
import DeleteProduct from "../components/DeleteProduct";

const SingleProduct = () => {
  const { productId } = useParams();
  const { cartCount, setCartCount, role } = useContext(AuthContext);
  const { tokenCaducadoVisible, setTokenCaducadoVisible } = useProducts();

  const [product, setProduct] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getSingleProductService(productId);
        setProduct(productData[0]);

        // Set the first photo as the selected one
        if (productData[0]?.photos && productData[0].photos.length > 0) {
          setSelectedPhoto(productData[0].photos[0].photo);
        }
      } catch (error) {
        if (error.message === "Token Caducado") {
          setTokenCaducadoVisible(true);
        }
        console.error("Error al cargar el producto:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleThumbnailClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="productPage">
      {product ? (
        <div className="product-detail">
          <div className="product-image" onClick={openModal}>
            {selectedPhoto && (
              <img
                src={`${import.meta.env.VITE_APP_BACKEND}/uploads/photos/${
                  product.name
                }/${selectedPhoto}`}
                alt={product.name}
              />
            )}
          </div>
          <div className="product-info">
            <div className="info-product">
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <p>
                <strong>Precio:</strong>{" "}
                {product.price ? product.price : "Precio no disponible"} €
              </p>
              <p>
                <strong>Material:</strong> {product.type}
              </p>
              <p>
                <strong>Publicado el: </strong>
                {product.date
                  ? new Date(product.date).toLocaleDateString()
                  : "Fecha no disponible"}
              </p>
            </div>
            <div className="product-thumbnails">
              {product.photos &&
                product.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="product-thumbnail"
                    onClick={() => handleThumbnailClick(photo.photo)}
                  >
                    <img
                      src={`${
                        import.meta.env.VITE_APP_BACKEND
                      }/uploads/photos/${product.name}/${photo.photo}`}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </div>
                ))}
            </div>
            <>
              <AddToCart
                tokenCaducadoVisible={tokenCaducadoVisible}
                setTokenCaducadoVisible={setTokenCaducadoVisible}
                productId={productId}
                onAddToCart={() => updateCartCount(cartCount + 1)}
              />
              {role == "admin" && (
                <DeleteProduct
                  productId={productId}
                  tokenCaducadoVisible={tokenCaducadoVisible}
                  setTokenCaducadoVisible={setTokenCaducadoVisible}
                />
              )}
            </>
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Zoom de Imagen"
            className="modal-content"
            overlayClassName="modal-overlay"
          >
            {selectedPhoto && (
              <img
                src={`${import.meta.env.VITE_APP_BACKEND}/uploads/photos/${
                  product.name
                }/${selectedPhoto}`}
                alt={product.name}
              />
            )}
            <button onClick={closeModal}>Cerrar</button>
          </Modal>
        </div>
      ) : (
        <p>Cargando producto...</p>
      )}
      {tokenCaducadoVisible && <TokenCaducado />}
    </div>
  );
};

export default SingleProduct;
