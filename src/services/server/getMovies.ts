import { API_KEY, BASE_URL } from "@/config";
import NotFoundError from "@/errors/NotFoundError";
import getMoviesMapper from "@/mappers/getMovies";
import { Results, ResultsWithError } from "@/types/Results";

const defaultResponse: [] = [];

export default async function getMoviesService({ search }: { search: string }) {
  if (!search) {
    return defaultResponse;
  }
  const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&s=${search}`);
  const data: Results & ResultsWithError = await response.json();

  if (
    data.Response === "False" &&
    data.Error != null &&
    data.Error === "Movie not found!"
  ) {
    throw new NotFoundError();
  }
  return getMoviesMapper(data);
}
