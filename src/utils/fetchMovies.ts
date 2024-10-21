import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-no-bg-no-text.png";

export type MovieData = {
  title: string;
  overview: string;
  release_date: string;
  popularity: number;
  poster_path: string;
  poster: string;
};

export const fetchMovies = async function (
  query: string,
): Promise<MovieData[]> {
  const accessToken = localStorage.getItem("accessToken") as string;
  if (!accessToken) {
    const navigate = useNavigate();
    navigate("/auth/login");
  }
  const encodedQuery = encodeURIComponent(query);
  const url = `${import.meta.env.VITE_API_HOST}api/movies?q=${encodedQuery}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });
    const json = await response.json();
    const movies: MovieData[] = json.data;

    return movies
      .sort(
        (movieA: MovieData, movieB: MovieData) =>
          movieB.popularity - movieA.popularity,
      )
      .map((movie: MovieData) => {
        const poster = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          : logo;
        return { ...movie, poster };
      });
  } catch (error) {
    console.error("Failed to fetch movies", error);

    return [];
  }
};
