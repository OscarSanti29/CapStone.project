import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, itemDetails } from "../API/functions";
import { addtoCart, removetoCart } from "../utilities";

export default function Cart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [loading, setLoading] = useState(true);
  const [token] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("token"));
    } catch {
      return null;
    }
  });

  const nav = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
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
        setCart(userCart);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        nav("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [nav, token]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAdd = async (item) => {
    try {
      const updatedCart = await addtoCart(cart, item);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleRemove = async (item) => {
    try {
      const updatedCart = await removetoCart(cart, item);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleDelete = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const cartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const generateConfirmationNumber = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleOrder = () => {
    const confirmationNumber = generateConfirmationNumber();
    const newOrder = { confirmationNumber, items: cart };

    try {
      const savedOrders = localStorage.getItem("orders");
      const ordersArray = savedOrders ? JSON.parse(savedOrders) : [];
      if (!Array.isArray(ordersArray)) {
        throw new Error("Orders is not an array");
      }
      ordersArray.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(ordersArray));
    } catch (error) {
      console.error("Error saving order to localStorage:", error);
    }

    clearCart();
    nav("/user/orders");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-black my-4">Your Cart</h1>
      <div className="flex flex-row">
        <div className="text-xl font-black">Total: ${cartTotal()}</div>
        <button
          className="btn btn-outline btn-success text-l mx-4"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          CheckOut (Items: {cartItemsCount()})
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Order</h3>
            <p className="py-4">Total: ${cartTotal()}</p>
            {cart.map((item) => (
              <div
                key={item.id}
                className="rounded-md shadow-inner shadow-green-950 my-4"
              >
                <div>{item.title}</div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-20 mx-4"
                />
                <div>Quantity: {item.quantity}</div>
              </div>
            ))}
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
              <button className="btn mx-4" onClick={handleOrder}>
                CheckOut
              </button>
            </div>
          </div>
        </dialog>
        <button
          className="btn btn-outline btn-error text-l"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>

      <div className="flex flex-row">
        {cart.map((item) => (
          <div
            key={item.id}
            className="card w-96 bg-base-100 shadow-xl shadow-green-950 mx-3"
          >
            <div className="card-body items-center text-center">
              <h1>{item.title}</h1>
              <figure className="px-10 pt-10">
                <img src={item.image} alt={item.title} className="rounded-xl" />
              </figure>
              <div className="flex flex-row">
                <button
                  className="btn btn-outline btn-success text-2xl"
                  onClick={() => handleAdd(item)}
                >
                  +
                </button>
                <h1 className="my-3 mx-3">Quantity: {item.quantity}</h1>
                <button
                  className="btn btn-outline btn-error text-2xl"
                  onClick={() => handleRemove(item)}
                >
                  -
                </button>
              </div>
              <button
                className="btn btn-outline btn-danger text-xl"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
