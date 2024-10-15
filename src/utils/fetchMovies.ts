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
  const url = `https://api.themoviedb.org/3/search/movie?api_key=3a0de3eeb3760231e263ad89f4cc73b1&query=${query}`;
  const response = await fetch(url);
  const json = await response.json();

  const movies: MovieData[] = json.results;

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
};
