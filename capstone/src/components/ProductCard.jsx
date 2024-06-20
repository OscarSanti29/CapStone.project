/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { addtoCart } from "../utilities";
import { useState } from "react";

export default function ProductDetails({ item, cart, setCart }) {
  const [token] = useState(JSON.parse(localStorage.getItem("token")));
  const nav = useNavigate();

  if (!item) {
    return <div>No product details available.</div>;
  }

  const { id, image, title, price } = item;

  function handleClick() {
    nav(`/products/${id}`);
  }

  async function handleAdd(item) {
    if (!token) {
      alert("Please Log in to Shop");
      nav("/auth/login");
    } else {
      try {
        const updatedCart = await addtoCart(cart, item);
        if (Array.isArray(updatedCart)) {
          setCart(updatedCart);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        } else {
          throw new Error("Updated cart is not an array");
        }
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    }
  }

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <h3>${price}</h3>
        <div className="card-actions justify-end">
          <button onClick={handleClick} className="btn btn-outline btn-success">
            Details
          </button>
          <button
            onClick={() => handleAdd(item)}
            className="btn btn-outline btn-success"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
