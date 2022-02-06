import { Reducer } from "redux";
import { IMoviesStates, MoviesTypes } from "./types";

const INITIAL_STATE: IMoviesStates = {
  genres: [],
  filters: {
    name: "",
    genres: [],
  },
  pagination: {
    currentPage: 1,
    currentSection: 0,
    total_pages: 0,
    total_results: 0,
  },
  movies: [],
  moviesFiltred: [],
};

const reducer: Reducer<IMoviesStates> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MoviesTypes.SET_FILTERS:
      return { ...state, filters: action.payload.filters };

    case MoviesTypes.SET_GENRES:
      return { ...state, genres: action.payload.genres };

    case MoviesTypes.SET_MOVIES:
      return { ...state, movies: action.payload.movies };

    case MoviesTypes.SET_PAGINATION:
      return { ...state, pagination: action.payload.pagination };

    case MoviesTypes.SET_MOVIES_FILTERED:
      return { ...state, moviesFiltred: action.payload.moviesFiltred };

    case MoviesTypes.CLEAR_MOVIES:
      return { ...state, moviesFiltred: INITIAL_STATE.moviesFiltred };
    default:
      return state;
  }
};
export default reducer;
