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

  return json.user;
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

//UserInfo
export const getUsersService = async (token) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/users`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `${token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.users;
};

//getmyCart
export const getMyUserCartService = async (token) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/user/mycart`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

//getMyOrder
export const getMyOrdersService = async (token) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/user/myorders`,
    {
      headers: {
        "content-type": "aplication/json",
        authorization: `${token}`,
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

//getMyProfile
export const getMyProfileService = async (token) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/user/myuser`,
    {
      headers: {
        "content-type": "aplication/json",
        authorization: `${token}`,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

// EditProfile
export const editUserDataService = async ({
  token,
  email,
  name,
  username,
  pwd,
  pwdNew,
  repeatpwd,
}) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/user/editprofile`,
    {
      method: "PUT",
      body: JSON.stringify({ email, name, username, pwd, pwdNew, repeatpwd }),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

//searchProducts
export const searchProductService = async (searchParams) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/products/search?${
      searchParams.name
        ? `name=${searchParams.name}`
        : `type=${searchParams.type}`
    }`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

//GetSales
export const getSalesInfoService = async ({ token, year, month }) => {
  const queryParams = [];

  if (year) {
    queryParams.push(`year=${year}`);
  }

  if (month) {
    queryParams.push(`month=${month}`);
  }

  let url = `${import.meta.env.VITE_APP_BACKEND}/products/sales`;

  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;
  }

  const response = await fetch(url, {
    headers: {
      "content-type": "aplication/json",
      authorization: `${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

// addToCartService.js
export const addToCartService = async (productId, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/products/${productId}/saveProduct`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

// addToCartService.js
export const removeToCartService = async (productId, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/products/${productId}`,
    {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

// deleteproduct
export const deleteProductService = async (productId, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/product/${productId}`,
    {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

// orderProduct
export const orderProductsService = async ({ formData, token }) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/products/sendOrder`,
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
  );

  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

//getOrders
export const getTemporaryOrdersInfo = async (token) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/products/orders`,
    {
      headers: {
        "content-type": "aplication/json",
        authorization: `${token}`,
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

//sellProduct
export const moveProductToSalesService = async (productId, token) => {
  console.log(productId, token);
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/products/${productId}/sales`,
    {
      method: "POST",
      headers: {
        "content-type": "aplication/json",
        authorization: token,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

//sellProduct
export const cancelOrderService = async (productId, token) => {
  console.log(productId, token);
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/products/${productId}/cancelOrder`,
    {
      method: "DELETE",
      headers: {
        "content-type": "aplication/json",
        authorization: token,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
