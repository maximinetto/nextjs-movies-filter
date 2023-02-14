import map from "@/errors/map";
import UnexpectedError from "@/errors/UnexpectedError";
import Movie from "@/types/Movie";

export default async function getMoviesService({ search = "" }) {
  const queryParams = new URLSearchParams({
    search,
  });

  const response = await fetch(`/api/movies?${queryParams}`, {
    method: "GET",
  });

  if (response.ok) {
    const data: {
      ok: boolean;
      data: Movie[];
    } = await response.json();

    return data.data;
  }
  const data: {
    ok: boolean;
    error: string;
  } = await response.json();
  const { error } = data;
  const errors = Object.entries(map);
  for (const [message, value] of errors) {
    if (error === message) {
      throw new value();
    }
  }

  throw new UnexpectedError();
}
