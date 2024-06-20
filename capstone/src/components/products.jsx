/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { fetchItems } from "../API/functions";
import ProductDetails from "./ProductCard";

export default function AllProducts() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetchItems();
        setItems(response);
        setFilteredItems(response);
      } catch (error) {
        console.error("Error getting products", error);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = items;
    if (category && category !== "All Items") {
      filtered = filtered.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredItems(filtered);
  }, [category, items, searchQuery]);

  function handleCategory(category) {
    setCategory(category);
  }

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  const cartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const cartitems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 text-white bg-green-950"
          >
            Categories
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-green-950"
          >
            <li onClick={() => handleCategory("All Items")}>
              <a>All Products</a>
            </li>
            <li onClick={() => handleCategory("Electronics")}>
              <a>Electronics</a>
            </li>
            <li onClick={() => handleCategory("Jewelery")}>
              <a>Jewelery</a>
            </li>
            <li onClick={() => handleCategory("men's clothing")}>
              <a>Men's Clothing</a>
            </li>
            <li onClick={() => handleCategory("women's clothing")}>
              <a>Women's Clothing</a>
            </li>
          </ul>
        </div>
        <div className="flex gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              className="input input-bordered input-success w-full max-w-xs"
            />
          </div>
          <div className="text-xl font-black">
            <h1> Total: ${cartTotal()}</h1>
            <h1>Items in Cart: {cartitems()}</h1>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredItems.map((item) => (
            <div key={item.id}>
              <ProductDetails
                key={item.id}
                item={item}
                cart={cart}
                setCart={setCart}
                className="group"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
