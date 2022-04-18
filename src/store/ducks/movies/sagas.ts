import { call, put } from "redux-saga/effects";
import { api } from "../../../services/api";
import { key } from "../../../services/key";
import { setGeners, setMovies, setPagination } from "./actions";
import { IPagination } from "./types";

export function* loadGenres(): any {
  try {
    const response = yield call(
      api.get,
      `genre/movie/list?api_key=${key}&language=pt-BR`
    );
    yield put(setGeners(response.data.genres));
  } catch (err) {}
}

export function* loadMovies(action: any): any {
  try {
    const response = yield call(
      api.get,
      `movie/popular?api_key=${key}&language=pt-BR&page=${action.payload.pagination.currentPage}`
    );

    let pagination: IPagination = {
      currentPage: response.data.page,
      currentSection: action.payload.pagination.currentSection,
      total_pages: response.data.total_pages,
      total_results: response.data.total_results,
    };
    yield put(setMovies(response.data.results));
    //  yield put(setMoviesFiltered(response.data.results));
    yield put(setPagination(pagination));
  } catch (err) {}
}
