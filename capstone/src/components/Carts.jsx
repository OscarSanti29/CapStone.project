import { getCart } from "../API/functions";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { itemDetails } from "../API/functions";
import { addtoCart, removetoCart } from "../utilities";

export default function Cart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("token"));
    } catch {
      return null;
    }
  });

  const nav = useNavigate();

  useEffect(() => {
    (async function fetchCart() {
      if (!token) {
        nav("/auth/login");
        return;
      }

      const payload = JSON.parse(window.atob(token.split(".")[1]));

      try {
        const cartData = await getCart(payload.sub, token);
        const userCart = await Promise.all(
          cartData[0].products.map(async (item) => {
            const details = await itemDetails(item.productId);
            return { ...details, quantity: item.quantity };
          })
        );
        console.log(userCart);
        setCart(userCart);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        nav("/auth/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [nav, token]);

  const handleAdd = async (item) => {
    try {
      const updatedCart = await addtoCart(cart, item);
      console.log(updatedCart);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleRemove = async (item) => {
    try {
      const updatedCart = await removetoCart(cart, item);
      console.log(updatedCart);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Cart</h1>
      <button onClick={clearCart}>Clear Cart</button>
      <div>Total: ${cartTotal()}</div>
      {cart.map((item) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <figure>
            <img src={item.image} alt={item.title} />
          </figure>
          <button
            className="btn btn-outline btn-success text-2xl"
            onClick={() => handleAdd(item)}
          >
            +
          </button>
          <button
            className="btn btn-outline btn-error text-2xl"
            onClick={() => handleRemove(item)}
          >
            -
          </button>
        </div>
      ))}
    </div>
  );
}
