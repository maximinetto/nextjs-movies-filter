import { unexpectedMessage } from "@/errors/messages/unexpected";
import NotFoundError from "@/errors/NotFoundError";
import getMoviesService from "@/services/client/getMovies";
import Movie from "@/types/Movie";
import { useMemo, useRef, useState } from "react";

export default function useMovies({
  movieList,
  search,
  defaultError = null,
  sort,
}: {
  movieList: Movie[];
  search: string;
  defaultError: string | null;
  sort: boolean;
}) {
  const [movies, setMovies] = useState(movieList);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(defaultError);
  const previousSearch = useRef<string | null>(null);

  const getMovies = async () => {
    if (search === previousSearch.current) return;

    try {
      setLoading(true);
      const movies = await getMoviesService({ search });
      setMovies(movies);
      setError(null);
      previousSearch.current = search;
    } catch (error) {
      if (error instanceof NotFoundError) {
        setMovies([]);
      }
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(unexpectedMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const moviesSorted = useMemo(
    () =>
      sort
        ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
        : movies,
    [sort, movies]
  );

  return { getMovies, movies: moviesSorted, error, isLoading };
}
