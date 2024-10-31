import { Link } from "react-router-dom";
import Slideshow from "../components/SlideShow";
import GameCard from "../components/GameCard";
import Loading from "../assets/Rolling@1x-1.0s-200px-200px.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGames, setPage, setSearch } from "../features/games";
import "./HomePage.css";

export default function HomePage({ url }) {
  const dispatch = useDispatch();

  const { games, loading, currentPage, totalPages, nextPage, prevPage, search } = useSelector(state => state.games);

  const isLoggedIn = localStorage.getItem("access_token") !== null;

  useEffect(() => {
    dispatch(fetchGames(currentPage, search));
  }, [dispatch, currentPage, search]);

  const handleSearch = e => {
    e.preventDefault();
    dispatch(setSearch(e.target.value));
    dispatch(setPage(1));
  };

  const handlePrevPage = () => {
    if (prevPage) {
      dispatch(setPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      dispatch(setPage(currentPage + 1));
    }
  };

  return (
    <>
      <Slideshow />
      <section className="mb-28"></section>

      {!isLoggedIn && (
        <section className="relative h-screen bg-transparent flex">
          <div
            className="w-3/4 h-full bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://media.rawg.io/media/games/779/77988e89f7862afeede524420aa251b0.jpg")',
              backgroundPosition: "center center",
              filter: "brightness(3)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black h-1/6 opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-l from-black opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-80" />
          </div>

          <div className="relative z-10 w-1/2 container mx-auto px-8 py-32 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-4 fade-in">Not sure what to play next?</h1>
            <p className="text-2xl text-gray-300 mb-6 fade-in">Don't worry, we've got you covered.</p>
            <p className="text-lg text-gray-400 mb-10 fade-in">Discover new games, keep track of the ones you want to play.</p>
            <Link to="/register" className="text-yellow-500 hover:text-yellow-400 w-auto">
              Join GGameWP Now!
            </Link>
          </div>
        </section>
      )}

      {isLoggedIn && (
        <>
          <section className="text-center mb-10 mt-10" style={{ margin: 40 }}>
            <h2 className="text-4xl font-bold text-white mb-2 text-shadow-lg">Discover Your Next Adventure!</h2>
          </section>

          <div className="search-bar relative">
            <form onSubmit={handleSearch} className="flex items-center justify-center">
              <input
                type="text"
                placeholder="Search for games..."
                value={search}
                onChange={e => dispatch(setSearch(e.target.value))}
                className="search-input transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full max-w-xl px-4 py-2 rounded-lg shadow-md"
              />
              <button type="submit" className="search-button flex items-center justify-center bg-yellow-400 text-black rounded-lg px-4 py-2 ml-2 hover:bg-yellow-600 transition-all duration-200">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
          </div>

          {loading ? (
            <div className="mt-32 flex justify-center items-center">
              <img src={Loading} alt="loading" />
            </div>
          ) : (
            <section style={{ margin: 40 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {games.map(game => (
                  <GameCard game={game} key={game.id} url={url} />
                ))}
              </div>

              <div className="flex justify-center items-center mt-10">
                <button
                  className={`btn bg-grey-500 text-yellow-400 px-4 py-2 rounded-lg transition-opacity duration-300 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-grey-600"}`}
                  onClick={handlePrevPage}
                  disabled={!prevPage}
                >
                  Previous
                </button>
                <span className="mx-4 text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className={`btn bg-grey-500 text-yellow-400 px-4 py-2 rounded-lg transition-opacity duration-300 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-grey-600"}`}
                  onClick={handleNextPage}
                  disabled={!nextPage}
                >
                  Next
                </button>
              </div>
            </section>
          )}
        </>
      )}

      <section className="mb-28"></section>
    </>
  );
}
