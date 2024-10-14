import { Link } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { CartIcon } from "../Icons";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-[#111111] my-3 flex justify-between py-5 px-20 text-[#fff]">
      <Link to="/">
        <h1 className="text-2xl font-bold">FunkoStore</h1>
      </Link>
      <ul className="flex items-center gap-x-6">
        {isAuthenticated ? (
          <>
            <li>Welcome {user.username.toUpperCase()}</li>
            <li>
              <Link to="/products">Catalog</Link>
            </li>
            <li>
              <Link to="/add-product">Create product</Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center relative">
              <CartIcon />
              <span className="absolute top-2/3 right-1/2 bg-red-500 text-sm w-5 h-5 rounded-full flex justify-center items-center w">
                0
              </span>
            </div>
          </>
        ) : (
          <>
            <li>
              <Link to="/products">Catalog</Link>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
