import axios from "axios";
import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/solid";
import Loading from "../assets/Rolling@1x-1.0s-200px-200px.svg";
import Toastify from "toastify-js";
import RecommendCard from "../components/RecommendCard";

export default function MyFavoritesPage({ url }) {
  const [favorites, setFavorites] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [recommendedGames, setRecommendedGames] = useState([]); // state baru untuk menyimpan detail game yang direkomendasikan
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchFavorites() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/fav`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setFavorites(data.favorite);
      setRecommendation(data.data); // simpan data rekomendasi
      console.log(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchGameDetails(gameId) {
    try {
      const { data } = await axios.get(`${url}/games/${gameId}`);
      console.log(data.gameDetails);

      setGames(prevGames => [...prevGames, data.gameDetails]); // tambahkan game baru ke state games
    } catch (error) {
      console.log(error);
    }
  }

  // Fungsi untuk mencari game berdasarkan nama
  async function fetchSearchGame(gameName) {
    try {
      const { data } = await axios.get(`${url}/games?&search=${gameName}`);
      if (data.results.length > 0) {
        return data.results[0]; // Ambil game pertama yang cocok dengan nama
      }
      return null; // Jika tidak ada hasil, return null
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function handleDelete(favorite) {
    try {
      const { data } = await axios.delete(`${url}/fav/${favorite.GameId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      fetchFavorites();
      Toastify({
        text: "Success delete from favorites!!!",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    } catch (error) {
      console.log();
    }
  }

  useEffect(() => {
    fetchFavorites();
  }, [url]);

  // fetch detail game berdasarkan favorit
  useEffect(() => {
    if (favorites.length > 0) {
      const gameDetailsPromises = favorites.map(fav => fetchGameDetails(fav.GameId));
      Promise.all(gameDetailsPromises);
    }
  }, [favorites, url]);

  // fetch rekomen game berdasarkan nama
  useEffect(() => {
    const fetchRecommendedGames = async () => {
      if (recommendation.length > 0) {
        try {
          const gameRecommendationPromises = recommendation.map(async rec => {
            const game = await fetchSearchGame(rec.name); // Fetch game dari name
            return game;
          });

          const foundGames = await Promise.all(gameRecommendationPromises);

          const validGames = foundGames.filter(game => game !== null);
          setRecommendedGames(validGames);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchRecommendedGames();
  }, [recommendation, url]);

  const favoriteGames = favorites.map(fav => {
    const game = games.find(g => g.id === fav.GameId); // cari game berdasarkan GameId
    return {
      ...fav,
      gameName: game?.name,
      background_image: game?.background_image,
      platforms: game?.platforms,
    };
  });

  return (
    <div className="p-20">
      <section className="mb-28"></section>
      <h1 className="text-2xl font-bold mb-10">My Favorites</h1>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <img src={Loading} alt="Loading..." />
        </div>
      ) : !favoriteGames || favoriteGames.length === 0 ? (
        <p className="flex justify-center text-md font-medium text-white mb-20">You don't have any favorite games🥺</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {favoriteGames.map(favorite => (
            <div key={favorite.id} className="relative max-w-xs bg-gray-950 rounded-lg shadow transition duration-300 ease-in-out transform hover:shadow-xl hover:shadow-yellow-400/50 hover:-translate-y-1 flex flex-col">
              <a href="#">
                <img className="rounded-t-lg w-full h-48 object-cover" src={favorite.background_image} alt={favorite.gameName} />
              </a>
              <div className="flex-grow p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{favorite.gameName}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{favorite?.platforms?.map(platform => platform?.platform?.name).join(", ") || "No platforms available"}</p>
              </div>
              <div className="p-5 flex justify-end items-center space-x-4">
                <button onClick={() => handleDelete(favorite)} className="text-yellow-500 hover:text-yellow-400" title="Remove Favorites">
                  <TrashIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!recommendedGames || recommendedGames.length === 0 ? (
        <p className="flex justify-center text-xl font-medium text-gray-500"></p>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-10 mt-10">Based on your favorite</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedGames.map(game => (
              <RecommendCard game={game} key={game.id} url={url} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
