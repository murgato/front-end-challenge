export enum MovieTypes {
  SET_MOVIE = "SET_MOVIE",
  SET_CREDITS = "SET_CREDITS",
  SET_TRAILER = "SET_TRAILER",
  SET_MOVIES_RECOMENDATION = "SET_MOVIES_RECOMENDATION",
  LOAD_MOVIE = "LOAD_MOVIE",
  LOAD_CREDITS = "LOAD_CREDITS",
  LOAD_TRAILER = "LOAD_TRAILER",
  LOAD_MOVIES_RECOMENDATION = "LOAD_MOVIES_RECOMENDATION",
  CLEAR_MOVIE = "CLEAR_MOVIE",
}
export interface IMovie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  overview: string;
  genres: IGenre[];
}
export interface IGenre {
  id: string | number;
  name: string;
}
export interface ICast {
  character: string;
  name: string;
  profile_path: string;
}
export interface ICrew {
  name: string;
  job: string;
}
export interface ITrailer {
  name: string;
  key: string;
}

export interface IMovieStates {
  readonly movie: IMovie;
  readonly credits: {
    cast: ICast[];
    crew: ICrew[];
  };
  readonly trailer: ITrailer;
  readonly moviesRecomedation: IMovie[];
}
