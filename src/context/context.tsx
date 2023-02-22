import React, {
  useState,
  useContext,
  useEffect,
  ReactNode,
  createContext,
} from "react";
import axios, { isAxiosError } from "axios";
import { IMovie, ISearch } from "../model";
import { useFetch } from "../hooks/useFetch";
// make sure to use https

export interface IError {
  show: boolean;
  msg: string;
}
interface IContext {
  movies: ISearch[];
  isLoading: boolean;
  error: IError;
  query: string | undefined;
  setQuery: (query: string | undefined) => void;
}

export const AppContext = createContext<IContext>({
  movies: [],
  error: { show: false, msg: "" },
  isLoading: false,
  query: "",
  setQuery(query: string | undefined) {},
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<string | undefined>("batman");
  const { error, isLoading, movies } = useFetch(`&s=${query}`);

  return (
    <AppContext.Provider value={{ movies, error, isLoading, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
