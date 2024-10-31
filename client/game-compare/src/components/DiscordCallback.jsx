import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import Loading from "../assets/Rolling@1x-1.0s-200px-200px.svg";
export default function DiscordCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    console.log("Authorization Code:", code);

    async function handleDiscordLogin() {
      if (code) {
        try {
          const response = await axios.post("http://localhost:3000/auth/discord/callback", { code });
          const { access_token } = response.data;

          localStorage.setItem("access_token", access_token);

          navigate("/");

          Toastify({
            text: "Success Login with Discord",
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
          console.error("Error during Discord login:", error);
        }
      }
    }

    handleDiscordLogin();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <img src={Loading} alt="Loading" />
    </div>
  );
}
