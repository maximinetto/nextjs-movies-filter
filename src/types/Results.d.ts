export type Results = {
  Search: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }[];
  totalResults: string;
  Response: string;
};

export type ResultsWithError = {
  Response: string;
  Error: string;
};
