import Toastify from "toastify-js";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const DiscordIcon = props => {
  return (
    <svg viewBox="0 -28.5 256 256" {...props}>
      <g>
        <path
          d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
          fill="currentColor"
          fillRule="nonzero"
        ></path>
      </g>
    </svg>
  );
};

export default function LoginPage({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${url}/login`, { email, password });
      console.log(data);

      localStorage.setItem("access_token", data.access_token);
      navigate("/");
      Toastify({
        text: "Success Login",
        duration: 2000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          fontWeight: "bold",
        },
      }).showToast();
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response?.data?.message || "Login failed",
        duration: 3000,
        newWindow: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#FF0000",
        },
        onClick: function () {},
      }).showToast();
    }
  }

  async function googleLogin(codeResponse) {
    try {
      const { data } = await axios.post(`${url}/google-login`, null, {
        headers: {
          token: codeResponse.credential,
        },
      });
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
      Toastify({
        text: "Success Login",
        duration: 2000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          fontWeight: "bold",
        },
      }).showToast();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDiscordLogin() {
    window.location.href = `https://discord.com/oauth2/authorize?client_id=1291500997352493077&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fdiscord%2Fcallback&scope=identify+email`;
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
        <div id="login" className="flex justify-center items-center h-full ">
          <div className="bg-transparent border backdrop-blur-lg shadow-lg p-8 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign In</h2>
            {/* Email input */}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-lg bg-transparent backdrop-blur-lg text-white border border-white focus:outline-none focus:ring-2 focus:ring-grey-200"
                  onChange={e => setEmail(e.target.value)}
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
                  className="w-full p-3 rounded-lg bg-transparent backdrop-blur-lg text-white border border-white focus:outline-none focus:ring-2 focus:ring-grey-200"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              {/* Login button */}
              <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
                Login
              </button>
              <div className="flex justify-center">
                <p className=" text-sm font-light text-white mt-5">
                  Didn't have an account?{" "}
                  <Link to="/register" className="font-medium text-blue-500 hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
            <div className="divider px-10 text-white">OR</div>
            <div className="mt-6 grid gap-4 items-center">
              <button className="flex items-center justify-center py-2 px-4 rounded-lg bg-[#5865F2] text-white hover:bg-[#5865F2]/80 transition-colors duration-300" onClick={handleDiscordLogin}>
                <DiscordIcon className="h-6 w-6 fill-white mr-3" />
                <span className="text-sm font-medium">Sign in with Discord</span>
              </button>
              <button className="flex items-center justify-center py-2 px-4 rounded-lg">
                <GoogleLogin onSuccess={googleLogin} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
