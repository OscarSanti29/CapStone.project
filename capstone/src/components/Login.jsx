/* eslint-disable no-undef */
import { Signin } from "../API/functions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [logdata, setlogdata] = useState({
    username: "",
    password: "",
  });
  const { username, password } = logdata;
  const nav = useNavigate();

  function handleOnChange(event) {
    const { name, value } = event.target;
    setlogdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function HandleLogin(event) {
    event.preventDefault();
    const result = await Signin(logdata);
    if (result && result.token) {
      nav("/products");
    }
  }
  return (
    <>
      <h1 className="text-center text-2xl font-black my-4">Log in</h1>
      <div className="logcontain">
        <div className="Login">
          <form onSubmit={HandleLogin}>
            <img
              className="logimage my-4"
              alt="Tailwind CSS Navbar component"
              src="https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
            />
            <div className="my-4">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="Username"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleOnChange}
                />
              </label>
            </div>
            <div className="my-4">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                />
              </label>
            </div>
            <div>
              <button type="submit" className="btn btn-outline btn-success">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
