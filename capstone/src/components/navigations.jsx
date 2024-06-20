import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navigate() {
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedin(true);
    }
  }, [loggedin]);

  return (
    <>
      <div className="navbar bg-base-100 bg-green-950">
        <div className="flex-1">
          <Link className="text-white" to="/products">
            The Store
          </Link>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 text-green-950"
          >
            {loggedin ? (
              <>
                <li>
                  <Link to="/users/:id">Profile</Link>
                </li>
                <li>
                  <Link to="/carts/users/:id"> View cart</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/auth/login">Log in</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
