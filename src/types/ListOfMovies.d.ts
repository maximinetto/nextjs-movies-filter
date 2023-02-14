import Movie from "./Movie";

export type ListOfMoviesWithError = {
  movies: Movie[];
  isLoading: booolean;
  error: string | null;
};

type ListOfMovies = Omit<ListOfMoviesWithError, "error">;

export type ListOfMoviesAlternative = {
  movieList: Movie[];
  errorServer: string | null;
};

export default ListOfMovies;
