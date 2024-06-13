import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../API/functions";

export default function User() {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  const [token] = useState(JSON.parse(localStorage.getItem("token")));
  const payload = JSON.parse(window.atob(token.split(".")[1]));
  const nav = useNavigate();

  useEffect(() => {
    (async function fetchUser() {
      if (!token) {
        nav("/auth/login");
        return;
      }
      try {
        const loggedUser = await getMe(payload.sub, token);

        if (loggedUser) {
          setuser(loggedUser);
        } else {
          nav("/auth/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        nav("/auth/login");
      } finally {
        setloading(false);
      }
    })();
  }, [nav, payload.sub, token]);
  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <>
      {" "}
      <h1 className="text-2xl font-black">Account</h1>{" "}
      <img
        className="rounded-full size-40 my-4"
        alt="Tailwind CSS Navbar component"
        src="https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
      />
      <div className="rounded-lg border-4 border-green-950 w-fit text-xl divide-y-4 divide-green-950 divide-opacity-50 my-4">
        <div>
          Account Holder: {user && user.name.firstname}{" "}
          {user && user.name.lastname}
        </div>
        <div>
          <div>Username: {user && user.username}</div>
          <div>Email: {user && user.email}</div>
        </div>
        <div>
          <ul>
            Shipping adress:
            <li>City: {user && user.address.city}</li>
            <li>Street: {user && user.address.street}</li>
            <li>Number: {user && user.address.number}</li>
            <li>Zipcode: {user && user.address.zipcode}</li>
          </ul>
        </div>
        <div>Phone Number: {user && user.phone}</div>
      </div>
    </>
  );
}
