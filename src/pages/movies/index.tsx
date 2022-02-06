import React, { useEffect } from "react";
import { useShallowEqualSelector } from "../../hooks/useShallowEqualSelector";
import * as action from "../../store/ducks/movies/actions";
import { IMovie, IMoviesStates } from "../../store/ducks/movies/types";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/movies.css";
import { ListGenres, MiniMovie, NotFound, Pagination } from "../../components";
const Movies = () => {
  const { moviesFiltred, pagination }: IMoviesStates =
    useShallowEqualSelector<IMoviesStates>(
      //@ts-ignore
      (state) => state.movies
    );
  const navigate = useNavigate();

  const { page } = useParams();

  const onChangePagination = (page: string | number) => {
    if (typeof page === "string") page = Number(page);
    let objPagination = JSON.parse(JSON.stringify(pagination));
    let newPagination = {
      ...objPagination,
      currentPage: page,
    };

    action.loadMovies(newPagination);

    navigate(`/movies/page=${page}`);
  };
  useEffect(() => {
    action.setPagination({
      ...pagination,
      currentPage: Number(page),
    });
  }, [page]);

  useEffect(() => {
    action.loadGenres();
  }, []);

  useEffect(() => {
    action.loadMovies(pagination);
  }, [pagination.currentPage]);

  return (
    <div>
      <div className="header-movies">
        <label className="label-header-Movies">
          Milhões de filmes, séries e pessoas para descobrir. Explore já.
        </label>
        <label className="title-filtros">filtre por</label>
        <div>
          <ListGenres />
        </div>
      </div>{" "}
      {moviesFiltred.length > 0 ? (
        <div className="container-movies">
          {moviesFiltred?.map((movie: IMovie, index) => {
            return (
              <div key={index}>
                <MiniMovie movie={movie} />
              </div>
            );
          })}
        </div>
      ) : (
        <NotFound message="Não foi encontrado nenhum filme" />
      )}
      <div>
        <Pagination
          currentPage={pagination.currentPage}
          total_results={pagination.total_results}
          total_pages={pagination.total_pages}
          onChange={onChangePagination}
        />
      </div>
    </div>
  );
};
export default Movies;
