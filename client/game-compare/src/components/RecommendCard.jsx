import { HeartIcon } from "@heroicons/react/solid"; // Example using Heroicons
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function RecommendCard({ game, url }) {
  const navigate = useNavigate();
  async function handleAddFavorite() {
    try {
      const { data } = await axios.post(
        `${url}/fav/${game.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      navigate("/my-favorites");
      Toastify({
        text: "Success Add To Favorite!!",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="relative max-w-xs bg-gray-950 rounded-lg shadow transition duration-300 ease-in-out transform hover:shadow-xl hover:shadow-yellow-400/50 hover:-translate-y-1 flex flex-col">
        <a href="#">
          <img className="rounded-t-lg w-full h-48 object-cover" src={game.background_image} alt={game.name} />
        </a>
        <div className="flex-grow p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{game.name}</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{game?.platforms?.map(platform => platform?.platform?.name).join(", ") || "No platforms available"}</p>
        </div>

        {/* Container for 'Read more' and 'HeartIcon' */}
        <div className="p-5 flex justify-end items-center space-x-4">
          <button onClick={handleAddFavorite} className="text-yellow-500 hover:text-yellow-400" title="Add to Favorites">
            <HeartIcon className="h-6 w-6" />
          </button>
          <a href="#" className="btn border border-solid border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black btn-sm">
            Read more
          </a>
        </div>
      </div>
    </>
  );
}
