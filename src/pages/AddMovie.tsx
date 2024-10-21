import { Button, Label, TextInput } from "flowbite-react";
import { FormEvent, useState } from "react";
import { fetchMovies, MovieData } from "../utils/fetchMovies";

export default function Movies() {
  const [searchResults, setSearchResults] = useState<MovieData[] | null>(null);
  const [title, setTitle] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleOnChangeTitle = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setTitle(value);
  };

  const handleAddMovie = async (e: FormEvent) => {
    e.preventDefault();
    if (title.length > 0) {
      setSearchQuery("");
      const movies = await fetchMovies(title);
      setSearchQuery(title);
      setSearchResults(movies);
    } else {
      setSearchQuery("");
    }
  };

  return (
    <div className="grid place-items-center gap-12 bg-gray-100 pb-10 pt-10 font-mono dark:bg-gray-900">
      <div className="max-w-xlg w-5/6 flex-col rounded-md bg-white px-4 leading-none text-gray-900 shadow-lg dark:bg-gray-800 dark:text-gray-300 md:flex">
        <div className="text-md my-4 flex justify-center px-4 text-lg font-bold">
          Add movie
        </div>
        <form className="gap-4" onSubmit={handleAddMovie}>
          <div className="flex flex-col md:flex-row">
            <Label
              htmlFor="title"
              value="Movie title"
              className="mx-2 mt-3 h-6 text-left font-bold"
            />
            <TextInput
              id="title"
              type="text"
              placeholder="Movie title..."
              required
              value={title}
              onChange={handleOnChangeTitle}
              className="flex grow flex-col"
            />
          </div>
          <div className="my-4 flex justify-center text-sm">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
      {searchResults !== null &&
        (searchResults.length !== 0 ? (
          <div className="max-w-xlg w-5/6 flex-col rounded-md bg-white py-6 leading-none text-gray-900 shadow-lg dark:bg-gray-800 dark:text-gray-300 md:flex">
            {searchResults.map((movie, i) => (
              <div key={i} className="text-md my-2 flex flex-col px-4 text-sm">
                <div className="flex flex-row">
                  <img className="w-1/4 self-start" src={movie.poster} />
                  <div className="flex grow flex-col justify-between px-4">
                    <div>
                      <div className="text-md font-bold">
                        {movie.title}, {movie.release_date.split("-")[0]}
                      </div>
                      <p>{movie.overview}</p>
                    </div>
                    <Button className="place-self-end">Save</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          searchQuery.length > 0 && (
            <span className="text-gray-900 dark:text-gray-200">
              Nothing found for "{searchQuery}"
            </span>
          )
        ))}
    </div>
  );
}
