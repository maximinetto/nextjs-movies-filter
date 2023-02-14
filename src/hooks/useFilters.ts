import { useEffect, useRef, useState } from "react";

export default function useFilters() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("No se puede buscar una película vacía");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar la película con un número");
      return;
    }

    if (search.length < 3) {
      setError("La búsqueda debe contener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  const updateSearch = (value: string) => {
    if (value.startsWith(" ")) return;

    setSearch(value);
  };

  const updateSort = () => {
    setSort(!sort);
  };

  return { search, updateSearch, sort, updateSort, error };
}
