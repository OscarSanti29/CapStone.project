import { useState, useEffect } from "react";
import { itemDetails } from "../API/functions";
import { useParams } from "react-router-dom";

export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await itemDetails(id);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { title, image, price, description, category, rating } = product;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-black my-4">{title}</h1>
      <img src={image} alt={title} className="w-80 h-auto my-4" />
      <div className="text-2xl font-medium my-4">${price}</div>
      <ul className="rounded-lg shadow-xl shadow-green-950 w-1/2 p-4 my-4">
        <li>
          <strong>Description:</strong> {description}
        </li>
        <li>
          <strong>Category:</strong> {category}
        </li>
      </ul>
      <div className="rounded-lg shadow-xl shadow-green-950 w-1/4 p-4 my-4 rating">
        <div>
          <strong>Rating:</strong> {rating.rate} ({rating.count} reviews)
        </div>
      </div>
    </div>
  );
}
