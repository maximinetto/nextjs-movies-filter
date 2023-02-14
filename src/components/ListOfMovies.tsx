import styles from "@/styles/ListOfMovies.module.css";
import ListOfMovies, { ListOfMoviesWithError } from "@/types/ListOfMovies";
import Image from "next/image";
import React from "react";
import notFoundImage from "../../public/notFound.png";

const NoResults: React.FC<{ message: string }> = ({ message }) => (
  <p>{message}</p>
);

const Loading = () => <p>Loading...</p>;

const ListOfMovies: React.FC<ListOfMovies> = ({ movies, isLoading }) =>
  isLoading ? (
    <Loading />
  ) : (
    <ul className={styles.movies}>
      {movies.map((movie, index) => (
        <li className={styles.movie} key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <Image
            src={movie.image ?? notFoundImage}
            alt={movie.title}
            priority={index < 3}
            width={200}
            height={300}
          />
        </li>
      ))}
    </ul>
  );

const Movies: React.FC<ListOfMoviesWithError> = ({
  movies,
  isLoading,
  error,
}) => {
  const hasMovies = movies.length > 0;

  return hasMovies ? (
    <ListOfMovies movies={movies} isLoading={isLoading} />
  ) : (
    <NoResults message={error ?? ""} />
  );
};

export default Movies;
