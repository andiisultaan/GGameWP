import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-5 left-5 right-5 px-6 py-2 bg-black backdrop-blur-sm bg-opacity-50 rounded-lg shadow-lg z-10">
      <div className="flex justify-between items-center w-full">
        <Link to="/" className="btn btn-ghost text-xl text-yellow-500">
          GGameWP
        </Link>
        <div className="ml-auto flex space-x-2">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn border border-solid border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black btn-sm">
                Sign In
              </Link>
              <Link to="/register" className="btn bg-yellow-500 text-black hover:border-yellow-500 hover:text-yellow-500 btn-sm">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/my-favorites" className="btn btn-ghost text-yellow-500 btn-sm">
                My Favorites
              </Link>
              <Link to="/profile" className="btn btn-ghost text-yellow-500 btn-sm">
                Profile
              </Link>
              <button onClick={handleLogout} className="btn border border-solid border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black btn-sm">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
