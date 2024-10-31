import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function RegisterPage({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e, username, email, password) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/register`, { username, email, password });
      console.log(data);

      navigate("/login");
      Toastify({
        text: `Thank you for regiseter ${data.username}`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #D91656, #640D5F)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }
  return (
    <>
      <div
        className="bg-cover bg-center h-screen"
        style={{
          backgroundImage: "url('https://r4.wallpaperflare.com/wallpaper/246/739/689/digital-digital-art-artwork-illustration-abstract-hd-wallpaper-28f60d7850600cb8e04c418e2872141a.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div id="register" className="flex justify-center items-center h-full ">
          <div className="bg-transparent border backdrop-blur-lg shadow-lg p-8 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Register</h2>
            {/* Registration form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  className="w-full p-3 rounded-lg bg-transparent backdrop-blur-lg text-white border border-white focus:outline-none focus:ring-2 focus:ring-gray-200"
                  onChange={e => setUsername(e.target.value)}
                  value={username}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-lg bg-transparent backdrop-blur-lg text-white border border-white focus:outline-none focus:ring-2 focus:ring-gray-200"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              {/* Password input */}
              <div className="mb-4 relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full p-3 rounded-lg bg-transparent backdrop-blur-lg text-white border border-white focus:outline-none focus:ring-2 focus:ring-gray-200"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>
              {/* Register button */}
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">Sign Up</button>
              <div className="flex justify-center">
                <p className="text-sm font-light text-white mt-5">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-blue-500 hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
