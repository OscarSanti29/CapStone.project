/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export default function ProductDetails({ item }) {
  const nav = useNavigate();

  if (!item) {
    return <div>No product details available.</div>;
  }

  const { id, image, title, price } = item;

  function handleClick() {
    nav(`/products/${id}`);
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
        </div>
      </div>
    </div>
  );
}
