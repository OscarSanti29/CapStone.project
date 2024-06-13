import { useState, useEffect } from "react";
import { SpecificCategory } from "../API/functions";
import { useParams } from "react-router-dom";

export default function Category() {
  const [Category, setCategory] = useState(null);
  const { cat } = useParams();

  useEffect(() => {
    async function getItems() {
      try {
        const response = await SpecificCategory(cat);
        setCategory(response);
      } catch (error) {
        console.error(error);
      }
    }
    getItems();
  }, [cat]);

  if (!Category) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {Category.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <img src={item.image} alt={item.title} />
          <p>Price: ${item.price}</p>
          <p>{item.description}</p>
          <p>Rating: {item.rating}</p>
        </div>
      ))}
    </div>
  );
}
