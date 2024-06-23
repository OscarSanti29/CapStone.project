import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../API/functions";

export default function User() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token] = useState(() => JSON.parse(localStorage.getItem("token")));
  const [, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [, setLoggedIn] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      if (!token) {
        nav("/auth/login");
        return;
      }

      const payload = JSON.parse(window.atob(token.split(".")[1]));

      try {
        const loggedUser = await getMe(payload.sub, token);
        if (loggedUser) {
          setUser(loggedUser);
        } else {
          nav("/auth/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        nav("/auth/login");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [nav, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  async function handleClick() {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    localStorage.removeItem("Order");
    localStorage.removeItem("orders");
    setCart([]);
    setLoggedIn(false);
    nav("/products");
    alert("You have been logged out");
  }

  return (
    <div className="container">
      <h1 className="text-2xl font-black">Account</h1>
      <div className="shadow-box">
        <img
          className="rounded-full size-40"
          alt="User avatar"
          src="https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
        />
        <div className="text-2xl">
          <div>
            Account Holder: {user?.name?.firstname} {user?.name?.lastname}
          </div>
          <div>
            <div>Username: {user?.username}</div>
            <div>Email: {user?.email}</div>
          </div>
          <div>
            <ul>
              Shipping Address:
              <li>City: {user?.address?.city}</li>
              <li>Street: {user?.address?.street}</li>
              <li>Number: {user?.address?.number}</li>
              <li>Zipcode: {user?.address?.zipcode}</li>
            </ul>
          </div>
          <div>Phone Number: {user?.phone}</div>
        </div>
        <button
          className="btn btn-outline btn-error my-4"
          onClick={handleClick}
        >
          Log off
        </button>
      </div>
    </div>
  );
}
