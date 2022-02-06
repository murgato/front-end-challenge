import { call, put } from "redux-saga/effects";
import { api } from "../../../services/api";
import { key } from "../../../services/key";
import {
  clearMovie,
  setCredits,
  setMovie,
  setMoviesRecomendation,
  setTrailer,
} from "./actions";

export function* loadMovie(action: any): any {
  try {
    const response = yield call(
      api.get,
      `movie/${action.payload.movie_id}?api_key=${key}&language=pt-BR`
    );
    put(clearMovie());
    put(setMovie(response.data));
  } catch (err) {
    console.error(err);
  }
}

export function* loadCredits(action: any): any {
  try {
    const response = yield call(
      api.get,
      `movie/${action.payload.movie_id}/credits?api_key=${key}&language=pt-BR`
    );
    put(setCredits(response.data));
  } catch (err) {
    console.error(err);
  }
}
export function* loadTrailer(action: any): any {
  try {
    const response = yield call(
      api.get,
      `movie/${action.payload.movie_id}/videos?api_key=${key}&language=pt-BR`
    );
    if (response.data.results && response.data.results?.length === 0) return;
    let trailer;
    if (response.data.results.length > 1) {
      trailer = response.data.results.find((video: any) => video.official);
    } else {
      trailer = response.data.results[0];
    }
    put(setTrailer({ key: trailer.key, name: trailer.name }));
  } catch (err) {
    console.error(err);
  }
}

export function* loadMoviesRecomendation(action: any): any {
  try {
    const response = yield call(
      api.get,
      `movie/${action.payload.movie_id}/similar?api_key=${key}&language=pt-BR&page=1`
    );
    put(setMoviesRecomendation(response.data.results));
  } catch (err) {
    console.error(err);
  }
}
