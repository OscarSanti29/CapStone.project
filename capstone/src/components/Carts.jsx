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
  const [orderNum, setorderNum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("token"));
    } catch {
      return null;
    }
  });

  const nav = useNavigate();

  function saveOrder(orderNum) {
    localStorage.setItem("ConfirmationNum", orderNum);
  }
  useEffect(() => {
    const max = 1000;
    const confirmNum = Math.floor(Math.random() * max);
    saveOrder(confirmNum);
  }, []);

  useEffect(() => {
    const storedNum = localStorage.getItem("ConfirmationNum");
    setorderNum(storedNum);
  }, []);

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
  const cartitems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
          CheckOut (Items: {cartitems()})
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Thank you for your purchase!!</h3>
            <p className="py-4">Total: ${cartTotal()}</p>
            <p>Confirmation #: {orderNum}</p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">View Order</button>
                <button className="btn">Close</button>
              </form>
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
          <div key={item.id}>
            <div className="card w-96 bg-base-100 shadow-xl mx-3">
              <div className="card-body items-center text-center">
                <h1>{item.title}</h1>
                <figure className="px-10 pt-10">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-xl"
                  />
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
