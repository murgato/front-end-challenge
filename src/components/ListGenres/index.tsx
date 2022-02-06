import { useShallowEqualSelector } from "../../hooks/useShallowEqualSelector";
import { IMoviesStates, IGenre, IMovie } from "../../store/ducks/movies/types";
import { RiCloseCircleFill } from "react-icons/ri";
import "../../css/movies.css";

import * as action from "../../store/ducks/movies/actions";
import { useEffect, useLayoutEffect } from "react";

export const ListGenres = () => {
  const { genres, filters, movies, pagination }: IMoviesStates =
    useShallowEqualSelector<IMoviesStates>(
      //@ts-ignore
      (state) => state.movies
    );

  useEffect(() => {
    let arrMovies = JSON.parse(JSON.stringify(movies));

    if (filters.genres.length > 0) {
      action.setMoviesFiltered(arrMovies);
      filterMoviesByGenres();
    } else {
      action.setMoviesFiltered(arrMovies);
    }
  }, [filters.genres]);

  useEffect(() => {
    if (movies.length !== 0) filterMoviesByGenres();
  }, [movies]);

  useLayoutEffect(() => {
    filterMoviesByGenres();
  }, [pagination.currentPage]);

  const checkGenre = (genre: IGenre) => {
    let arrGenresFilter = JSON.parse(JSON.stringify(filters.genres));
    let element = document.getElementById(genre.name);

    let check = arrGenresFilter.findIndex((i: number) => i === genre.id);
    if (check === -1) {
      arrGenresFilter.push(genre.id);
      element?.classList.add("check");
    } else {
      arrGenresFilter.splice(check, 1);
      element?.classList.remove("check");
      filterMoviesByGenres();
    }
    action.setFilters({ ...filters, genres: arrGenresFilter });
  };

  const filterMoviesByGenres = () => {
    let arrMovies = JSON.parse(JSON.stringify(movies));
    let auxMovies: IMovie[] = [];

    arrMovies?.forEach((movie: IMovie) => {
      let genres_id = movie.genre_ids.filter((id) => {
        let index = filters.genres.findIndex((genre) => genre === id);
        if (index !== -1) {
          return id;
        }
      });
      if (genres_id.length === filters.genres.length) {
        auxMovies.push(movie);
      }
    });
    action.clearMovies();
    action.setMoviesFiltered(auxMovies);
  };

  const isCheck = (id: number): boolean => {
    let arrGenresFilter = JSON.parse(JSON.stringify(filters.genres));
    let check = arrGenresFilter.findIndex((i: number) => i === id);
    return check > -1;
  };
  const clearAll = () => {
    genres?.forEach((genre: IGenre) => {
      let element = document.getElementById(genre.name);
      element?.classList.remove("check");
    });
    action.setFilters({ ...filters, genres: [] });
  };
  return (
    <>
      <div className="container-genres">
        {genres?.map((genre: IGenre, index: number) => {
          return (
            <div
              id={genre.name}
              key={index}
              className={`button-genre ${isCheck(genre.id) ? "check" : ""}`}
              onClick={() => checkGenre(genre)}
            >
              <label>{genre.name}</label>
              {isCheck(genre.id) && <RiCloseCircleFill size={25} />}
            </div>
          );
        })}
        {filters?.genres?.length > 0 ? (
          <div className="button-genre check" onClick={clearAll}>
            <label>Remover todos</label>
            <RiCloseCircleFill size={25} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ListGenres;
