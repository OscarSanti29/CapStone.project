const APIURL = "https://fakestoreapi.com";

export async function fetchItems() {
  try {
    const response = await fetch(`${APIURL}/products`);
    const result = response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
export async function itemDetails(itemId) {
  try {
    const response = await fetch(`${APIURL}/products/${itemId}`);
    if (!response.ok) {
      throw new Error("Error");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Product not found", error);
  }
}

export async function Signin(userdata) {
  try {
    const response = await fetch(`${APIURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userdata.username,
        password: userdata.password,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to log in");
    }
    const result = await response.json();
    console.log(result);
    if (result.token) {
      localStorage.setItem("token", JSON.stringify(result.token));
    }
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMe(userId, token) {
  try {
    const response = await fetch(`${APIURL}/users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Failed to fetch user: ${errorDetails.message || "unknown error"}`
      );
    }
    const result = await response.json();
    return result.id ? result : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCart(userId, token) {
  try {
    const response = await fetch(`${APIURL}/carts/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Failed to get cart:${errorDetails.message || "unknown error"}`
      );
    }
    const cartData = await response.json();
    return cartData;
  } catch (error) {
    console.error(error);
    return null;
  }
}
