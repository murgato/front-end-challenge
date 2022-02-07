import { call, put } from "redux-saga/effects";
import { api } from "../../../services/api";
import { key } from "../../../services/key";
import { certification } from "../../../util/helpers/certification";
import { IMovie } from "../movie/types";
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
    const responseReleaseDate = yield call(
      api.get,
      `movie/${action.payload.movie_id}/release_dates?api_key=${key}&language=pt-BR`
    );
    let releaseDate;
    if (responseReleaseDate.data.results.length > 1) {
      releaseDate = responseReleaseDate.data.results?.find(
        (releaseDate: any) => releaseDate.iso_3166_1 === "BR"
      );
      if (!releaseDate)
        releaseDate = responseReleaseDate.data.results?.find(
          (releaseDate: any) => releaseDate.iso_3166_1 === "US"
        );
    } else {
      releaseDate = responseReleaseDate.data.results[0];
    }
    let movie: IMovie = {
      id: response.data.id,
      genres: response.data.genres,
      overview:
        response.data.overview === ""
          ? "SEM SINOPSE BRASILEIRA"
          : response.data.overview,
      poster_path: response.data.poster_path,
      title: response.data.title,
      vote_average: response.data.vote_average,
      release_date: releaseDate
        ? releaseDate.release_dates[0]?.release_date
        : response.data.release_date,
      certification: releaseDate
        ? releaseDate.release_dates[0]?.certification !== ""
          ? certification[releaseDate.release_dates[0]?.certification]
            ? certification[releaseDate.release_dates[0]?.certification]
            : releaseDate.release_dates[0]?.certification
          : "SEM CLASSIFICAÇÃO"
        : "SEM CLASSIFICAÇÃO BRASILEIRA",
      runtime: response.data.runtime,
      language: releaseDate
        ? releaseDate.iso_3166_1
        : response.data.original_language.toUpperCase(),
    };
    put(clearMovie());
    put(setMovie(movie));
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
      `movie/${action.payload.movie_id}/recommendations?api_key=${key}&language=pt-BR&page=1`
    );
    put(setMoviesRecomendation(response.data.results));
  } catch (err) {
    console.error(err);
  }
}
