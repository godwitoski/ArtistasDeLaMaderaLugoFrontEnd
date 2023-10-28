import { useState, useContext } from "react";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  return {
    products,
    setProducts,
    loading,
    setLoading,
    error,
    setError,
  };
};

export default usePosts;
