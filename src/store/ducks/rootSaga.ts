import { all, takeLatest } from "redux-saga/effects";
import {
  loadCredits,
  loadMovie,
  loadMoviesRecomendation,
  loadTrailer,
} from "./movie/sagas";
import { loadGenres, loadMovies } from "./movies/sagas";
import { MovieTypes } from "./movie/types";
import { MoviesTypes } from "./movies/types";

export default function* rootSaga(): any {
  return yield all([
    takeLatest(MoviesTypes.LOAD_GENRES, loadGenres),
    takeLatest(MoviesTypes.LOAD_MOVIES, loadMovies),
    takeLatest(MovieTypes.LOAD_MOVIE, loadMovie),
    takeLatest(MovieTypes.LOAD_CREDITS, loadCredits),
    takeLatest(MovieTypes.LOAD_TRAILER, loadTrailer),
    takeLatest(MovieTypes.LOAD_MOVIES_RECOMENDATION, loadMoviesRecomendation),
  ]);
}
