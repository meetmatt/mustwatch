import { FormEvent, useState } from "react";

const defaultMovies = [
  "Friend of the world",
  "God's creatures",
  "Confess, Fletch",
  "Black rain",
  "Poor things",
];

export default function Movies() {
  const [movies, setMovies] = useState<string[]>(defaultMovies);
  const [title, setTitle] = useState<string>("");

  const handleAddMovie = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      setMovies([...movies, title]);
      setTitle("");
    }
  };

  const handleRemoveMovie = (indexToRemove: number) => {
    setMovies((currentMovies: string[]) => [
      ...currentMovies.slice(0, indexToRemove),
      ...currentMovies.slice(indexToRemove + 1),
    ]);
  };

  return (
    <div>
      <h1>Movies</h1>
      <form onSubmit={handleAddMovie}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie title"
          style={{
            lineHeight: "2.1em",
            fontSize: "1em",
            paddingLeft: "0.7em",
            marginRight: "0.7em",
          }}
        />
        <button type="submit">Add Movie</button>
      </form>
      <ol style={{ textAlign: "left" }}>
        {movies.map((title, index) => (
          <li key={index}>
            {title}{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleRemoveMovie(index)}
            >
              ×
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
