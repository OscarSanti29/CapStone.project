import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    try {
      const parsedOrders = savedOrders ? JSON.parse(savedOrders) : [];
      return Array.isArray(parsedOrders) ? parsedOrders : [];
    } catch (error) {
      console.error("Error parsing orders from localStorage:", error);
      return [];
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("token"));
    } catch {
      return null;
    }
  });

  const nav = useNavigate();

  useEffect(() => {
    try {
      localStorage.setItem("orders", JSON.stringify(orders));
    } catch (error) {
      console.error("Error setting orders to localStorage:", error);
    }
  }, [orders]);

  const cartTotal = (order) => {
    return order.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const cartItemsCount = (order) => {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  };

  const renderOrders = () => {
    if (!orders || orders.length === 0) {
      return <p>No orders found.</p>;
    }

    return orders.map((order, orderIndex) => (
      <div
        className="card w-96 bg-base-100 shadow-xl shadow-green-950 mx-3 my-4"
        key={orderIndex}
      >
        <h2 className="text-xl font-black  mx-3 my-2">
          Order #{orderIndex + 1}
        </h2>
        <h2 className="text-xl font-black  mx-3 my-2">
          Confirmation Number: {order.confirmationNumber}
        </h2>
        <ul className="mx-3">
          {order.items.map((item, itemIndex) => (
            <>
              <li key={itemIndex}>
                <div>
                  <h3>{item.title}</h3>
                  <img src={item.image} alt={item.title} width="50" />
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                </div>
              </li>
            </>
          ))}
        </ul>
        <div className="text-xl font-black  mx-3 my-2">
          Total Items: {cartItemsCount(order)}
        </div>
        <div className="text-xl font-black  mx-3 my-2">
          Total: {cartTotal(order)}
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h1 className="text-2xl font-black my-4">Your Orders</h1>
      {renderOrders()}
    </div>
  );
}
