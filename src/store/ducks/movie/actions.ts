import { action } from "typesafe-actions";
import store from "../..";
import { IMovieStates, MovieTypes } from "./types";

export const loadMovie = (movie_id: string) =>
  store.dispatch(action(MovieTypes.LOAD_MOVIE, { movie_id }));

export const loadCredits = (movie_id: string) =>
  store.dispatch(action(MovieTypes.LOAD_CREDITS, { movie_id }));

export const loadTrailer = (movie_id: string) =>
  store.dispatch(action(MovieTypes.LOAD_TRAILER, { movie_id }));

export const loadMoviesRecomendation = (movie_id: string) =>
  store.dispatch(action(MovieTypes.LOAD_MOVIES_RECOMENDATION, { movie_id }));

export const setMovie = (movie: IMovieStates["movie"]) =>
  store.dispatch(action(MovieTypes.SET_MOVIE, { movie }));

export const setCredits = (credits: IMovieStates["credits"]) =>
  store.dispatch(action(MovieTypes.SET_CREDITS, { credits }));

export const setTrailer = (trailer: IMovieStates["trailer"]) =>
  store.dispatch(action(MovieTypes.SET_TRAILER, { trailer }));

export const setMoviesRecomendation = (
  moviesRecomedation: IMovieStates["movie"]
) =>
  store.dispatch(
    action(MovieTypes.SET_MOVIES_RECOMENDATION, { moviesRecomedation })
  );

export const clearMovie = () => store.dispatch(action(MovieTypes.CLEAR_MOVIE));
