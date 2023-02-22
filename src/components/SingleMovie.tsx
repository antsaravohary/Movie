import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { IError } from "../context/context";

import axios from "axios";
import { IMovie, ISearch } from "../model";
import { API_ENDPOINT } from "../hooks/useFetch";

const SingleMovie = () => {
  const { id } = useParams();

  const [movie, setMovies] = useState<Partial<ISearch>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<IError>({ msg: "", show: false });

  const fetchMovie = async (url: string) => {
    setIsLoading(true);
    const response = await axios.get(url);
    const movies = response.data as ISearch;
    console.log(movies);
    setMovies(movies);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
  }, [id]);

  if (isLoading) {
    return <div className="loading"></div>;
  }
  const { Poster: poster, Title: title, Plot: plot, Year: year } = movie;
  return (
    <section className="single-movie">
      <img src={poster} alt={title} />
      <div className="single-movie-info">
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>{year}</h4>
        <Link to={"/"} className="btn">
          Back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
