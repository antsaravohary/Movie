import React, { useState, useEffect } from "react";
import { IError } from "../context/context";
import { IMovie, ISearch } from "../model";
import axios, { isAxiosError } from "axios";

export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${
  import.meta.env.VITE_REACT_APP_MOVIE_API_KEY
}`;

export const useFetch = (query: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError>({ show: false, msg: "" });
  const [movies, setMovies] = useState<ISearch[]>([]);
  const fetchMovies = async (url: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      const movies = response.data as IMovie;
      if (movies.Response === "True") {
        setMovies(movies.Search);
        setError({ show: false, msg: "" });
      } else {
        setError({ show: true, msg: movies.Error });
      }
      setIsLoading(false);
      return movies;
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        console.log(e.response?.data);
      }
    }
  };

  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}${query}`);
  }, [query]);
  return { isLoading, error, movies };
};
