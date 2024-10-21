import { Movie } from "../components/Movie.tsx";

import "../css/movie.css";

export default function Movies() {
  return (
    <div className="grid place-items-center gap-12 bg-gray-100 pb-10 pt-10 font-mono dark:bg-gray-900">
      {[...Array(15).keys()].map((i) => (
        <Movie key={i} title="Joker" description="Lorem ipsum" />
      ))}
    </div>
  );
}