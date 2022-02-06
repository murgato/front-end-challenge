export enum MoviesTypes {
  SET_FILTERS = "SET_FILTERS",
  SET_MOVIES = "SET_MOVIES",
  SET_GENRES = "SET_GENRES",
  SET_PAGINATION = "SET_PAGINATION",
  LOAD_GENRES = "LOAD_GENRES",
  LOAD_MOVIES = "LOAD_MOVIES",
  SET_MOVIES_FILTERED = "SET_MOVIES_FILTERED",
  CLEAR_MOVIES = "CLEAR_MOVIES",
}

export interface IFilters {
  name: string;
  genres: number[];
}

export interface IGenre {
  id: number;
  name: string;
}
export interface IPagination {
  currentPage: number;
  total_pages: number;
  total_results: number;
  currentSection: number;
}

export interface IMovie {
  id: number;
  title: string;
  originalTitle: string;
  poster_path: string;
  genre_ids: number[];
  release_date: Date;
}

export interface IMoviesStates {
  readonly filters: IFilters;
  readonly genres: IGenre[];
  readonly movies: IMovie[];
  readonly moviesFiltred: IMovie[];
  readonly pagination: IPagination;
}
