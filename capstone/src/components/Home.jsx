import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  function HandleStore() {
    nav("/products");
  }
  function HandleLogin() {
    nav("/auth/login");
  }
  return (
    <>
      <h1 className="text-center text-2xl font-black my-4">
        Welcome to the Store
      </h1>
      <div className="homecontainer">
        <div>
          <button
            className="btn btn-block btn-outline btn-success shadow-2xl shadow-green-950 text-2xl my-4 w-96 "
            onClick={HandleStore}
          >
            Browse Products
          </button>
        </div>
        <div>
          <button
            className=" btn btn-block btn-outline btn-success shadow-2xl shadow-green-950 text-2xl w-96"
            onClick={HandleLogin}
          >
            Log in
          </button>
        </div>
      </div>
    </>
  );
}
