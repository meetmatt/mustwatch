import { Context } from "@x/oak";
import { prisma } from "../../prisma/client.ts";
import { searchMovies } from "../services/tmdb.ts";

export async function handleCreateMovie(ctx: Context) {
  const body = await ctx.request.body.json();

  // TODO: fetch full movie from TMDB API

  const movieDto = {
    tmdbId: body.tmdbId,
    title: "Joker: Folie à Deux",
    year: 2024,
    genres: ["Musical", "Drama", "Thriller"],
    actors: ["Joaquin Phoenix", "Lady Gaga"],
    director: "Todd Phillips",
    countries: ["USA"],
  };

  const movie = await prisma.movie.create({ data: movieDto });
  ctx.response.status = 201;
  ctx.response.body = movie;
}

export async function handleSearchMovies(ctx: Context) {
  const query = ctx.request.url.searchParams.get("q");
  if (!query) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing query parameter" };
    return;
  }

  const results = await searchMovies(query);
  ctx.response.body = results;
}
