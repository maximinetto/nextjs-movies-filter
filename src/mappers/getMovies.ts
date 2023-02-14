import Movie from "@/types/Movie";
import Results from "@/types/Results";
import Type from "@/types/Type";

export default function getMoviesMapper(results: Results) {
  const movies = results.Search;
  const mappedMovies: Movie[] = movies.map((m) => ({
    id: m.imdbID,
    title: m.Title,
    image: m.Poster !== "N/A" ? m.Poster : null,
    type: m.Type as Type,
    year: m.Year,
  }));

  return mappedMovies;
}
