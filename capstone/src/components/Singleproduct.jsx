import { useState, useEffect } from "react";
import { itemDetails } from "../API/functions";
import { useParams } from "react-router-dom";

export default function Singleproduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await itemDetails(id);
        setProduct(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { title, image, price, description, category, rating } = product;

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-black my-4">{title}</h1>
      <div>
        <img src={image} alt={title} className="size-80" />
        <div className="text-2xl font-medium">${price}</div>
        <ul className="rounded-lg border-4 border-green-950 w-1/2 my-4 p-4">
          <li>Description: {description}</li>
          <li>Category: {category}</li>
        </ul>
        <div className="rounded-lg border-4 border-green-950 w-1/4 p-4 my-4 rating">
          <div>
            Rating: {rating.rate} ({rating.count} reviews)
          </div>
        </div>
      </div>
    </div>
  );
}
