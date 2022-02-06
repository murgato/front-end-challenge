import { action } from "typesafe-actions";
import store from "../..";
import { MoviesTypes, IMoviesStates } from "./types";

export const setFilters = (filters: IMoviesStates["filters"]) =>
  store.dispatch(action(MoviesTypes.SET_FILTERS, { filters }));

export const setGeners = (genres: IMoviesStates["genres"]) =>
  store.dispatch(action(MoviesTypes.SET_GENRES, { genres }));

export const setMovies = (movies: IMoviesStates["movies"]) =>
  store.dispatch(action(MoviesTypes.SET_MOVIES, { movies }));

export const setPagination = (pagination: IMoviesStates["pagination"]) =>
  store.dispatch(action(MoviesTypes.SET_PAGINATION, { pagination }));

export const setMoviesFiltered = (
  moviesFiltred: IMoviesStates["moviesFiltred"]
) => store.dispatch(action(MoviesTypes.SET_MOVIES_FILTERED, { moviesFiltred }));

export const loadGenres = () => store.dispatch(action(MoviesTypes.LOAD_GENRES));

export const loadMovies = (pagination: IMoviesStates["pagination"]) =>
  store.dispatch(action(MoviesTypes.LOAD_MOVIES, { pagination }));

export const clearMovies = () =>
  store.dispatch(action(MoviesTypes.CLEAR_MOVIES));
