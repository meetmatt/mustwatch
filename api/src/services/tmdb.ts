const TMDB_API_KEY = String(Deno.env.get("TMDB_API_KEY"));

export const searchMovies = async (query: string) => {
  const encodedQuery = encodeURIComponent(query);
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodedQuery}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies from TMDB");
  }

  const data = await response.json();

  return data.results;
};
