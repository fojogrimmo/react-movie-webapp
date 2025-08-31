import { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebounceSearchTerm] = useState("");

  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      console.log(data);

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovies([]);
        return;
      }
      setMovies(data.results || []);
    } catch (error) {
      setErrorMessage(`Error fetching movies: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchMovies(searchTerm);
    }
  };

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <div className="intro-poster">
            <div className="intro">
              <h1 className="intro-text">
                Find movies <br />{" "}
                <span className="text-gradient">TV shows and more</span>
              </h1>
              <button type="button" className="btn">
                <span className="btn__icon">
                  <ion-icon size="large" name="play-circle-outline"></ion-icon>
                </span>
                <span className="btn__text">Watch Tutorial</span>
              </button>
            </div>

            <div className="poster">
              <img src="/posters.png" alt="Movie posters" />
            </div>
          </div>
          <header>
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
            />
          </header>
        </div>
        {!debouncedSearchTerm.trim() && (
          <section className="scroll">
            <div className="scroll-holder">
              <div className="item item1">
                <img src="/banner_1.webp" alt="" />
              </div>
              <div className="item item2">
                <img src="/banner_2.jpg" alt="" />
              </div>
              <div className="item item3">
                <img src="/banner_3.jpg" alt="" />
              </div>
              <div className="item item4">
                <img src="/banner_4.jpg" alt="" />
              </div>
              <div className="item item5">
                <img src="/banner_5.jpg" alt="" />
              </div>
              <div className="item item6">
                <img src="/banner_6.jpg" alt="" />
              </div>
              <div className="item item7">
                <img src="/banner_7.jpg" alt="" />
              </div>
              <div className="item item8">
                <img src="/banner_8.jpg" alt="" />
              </div>
              <div className="item item9">
                <img src="/banner_9.jpg" alt="" />
              </div>
              <div className="item item10">
                <img src="/banner_10.jpg" alt="" />
              </div>
            </div>
          </section>
        )}

        <div className="wrapper">
          <section className="all-movies">
            <h2>
              {debouncedSearchTerm.trim()
                ? `Search Results for "${debouncedSearchTerm}"`
                : "Popular"}
            </h2>
            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default App;
