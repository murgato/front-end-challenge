import { Reducer } from "redux";
import { IMovieStates, MovieTypes } from "./types";

const INITIAL_STATE: IMovieStates = {
  movie: {
    id: 0,
    title: "",
    release_date: "",
    vote_average: 0.0,
    poster_path: "",
    overview: "",
    genres: [],
  },
  credits: {
    cast: [],
    crew: [],
  },
  trailer: {
    key: "",
    name: "",
  },
  moviesRecomedation: [],
};

const reducer: Reducer<IMovieStates> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MovieTypes.SET_MOVIE:
      return { ...state, movie: action.payload.movie };

    case MovieTypes.SET_CREDITS:
      return { ...state, credits: action.payload.credits };

    case MovieTypes.SET_TRAILER:
      return { ...state, trailer: action.payload.trailer };

    case MovieTypes.SET_MOVIES_RECOMENDATION:
      return {
        ...state,
        moviesRecomedation: action.payload.moviesRecomedation,
      };

    case MovieTypes.CLEAR_MOVIE:
      return {
        ...state,
        movie: INITIAL_STATE.movie,
        credits: INITIAL_STATE.credits,
        trailer: INITIAL_STATE.trailer,
        moviesRecomedation: INITIAL_STATE.moviesRecomedation,
      };
    default:
      return state;
  }
};

export default reducer;
