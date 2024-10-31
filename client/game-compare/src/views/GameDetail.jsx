import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../assets/Rolling@1x-1.0s-200px-200px.svg";

export default function GameDetail({ url }) {
  const [game, setGame] = useState({});
  const [funFact, setFunFact] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  async function fetchGame() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/games/${id}`);
      setGame(data.gameDetails);
      setFunFact(data?.funFact?.fun_fact);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGame();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <section
        className="hero h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${game.background_image})`,
          backgroundPosition: "center top",
        }}
      ></section>
      {loading ? (
        <div className="mt-32 flex justify-center items-center">
          <img src={Loading} alt="loading" />
        </div>
      ) : (
        <>
          <section className="my-12 px-6 bg-black">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-4xl font-bold mb-4 text-white">{game.name}</h2>
              {game.released && (
                <h3 className="text-lg font-semibold mb-2">
                  Release Date: <span className="font-normal text-gray-400">{game.released}</span>
                </h3>
              )}
              {game.genres && game.genres.length > 0 && (
                <h3 className="text-lg font-semibold mb-2">
                  Genre: <span className="font-normal text-gray-400">{game.genres.map(genre => genre.name).join(", ")}</span>
                </h3>
              )}
              {game.publishers && game.publishers.length > 0 && (
                <h3 className="text-lg font-semibold mb-2">
                  Publisher: <span className="font-normal text-gray-400">{game.publishers.map(publisher => publisher.name).join(", ")}</span>
                </h3>
              )}
              {game.description_raw && <p className="text-lg leading-relaxed text-gray-400">{game.description_raw}</p>}
            </div>

            <div className="mt-12 py-8 px-6 bg-gray-950 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-yellow-400">Fun Fact About this Game</h2>
              <p className="text-lg text-gray-300 leading-relaxed">{funFact}</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
