import Type from "./Type";

type Movie = {
  title: string;
  year: string;
  id: string;
  type: Type;
  image: string | null;
};

export default Movie;
