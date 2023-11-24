import { useState, useContext } from "react";

export const useProducts = () => {
  const [tokenCaducadoVisible, setTokenCaducadoVisible] = useState(false);

  return {
    tokenCaducadoVisible,
    setTokenCaducadoVisible,
  };
};
