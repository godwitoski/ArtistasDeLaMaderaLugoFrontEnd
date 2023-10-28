// Register
export const registerUserService = async ({
  email,
  name,
  username,
  pwd,
  repeatpwd,
}) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/register`, {
    method: "POST",
    body: JSON.stringify({ email, name, username, pwd, repeatpwd }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};

// Login
export const logInUserService = async ({ email, pwd }) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/login`, {
    method: "POST",
    body: JSON.stringify({ email, pwd }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

// Obtener los datos del usuario logueado
export const getMyUserDataService = async (token) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/user/myuser`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    }
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

//HOMEPAGE
export const getProducts = async () => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.products;
};

//SingleProduct
export const getSingleProductService = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/products/${id}`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.products;
};
