import moment from "moment-timezone";
import { useState } from "react";
import { IMovieStates } from "../store/ducks/movie/types";

const useSetInfoMovie = () => {
  const [infoMovie, setInfoMovie] = useState("");

  const setInfo = (movie: IMovieStates["movie"]) => {
    let data = moment(new Date(movie.release_date)).format("DD/MM/YYYY");
    let genres = ``;
    movie.genres.forEach((genre, index) => {
      if (index === movie.genres.length - 1) {
        genres += genre.name;
      } else {
        genres += `${genre.name}, `;
      }
    });
    let runtime;
    if (movie.runtime > 0) {
      let auxRuntime = movie.runtime / 60;
      let DecimalAuxRuntime = auxRuntime - parseInt(auxRuntime.toString());
      let hours = parseInt(auxRuntime.toString());
      let minutes = DecimalAuxRuntime * 60;
      runtime = `${hours}h ${Math.round(minutes)}m`;
    }
    setInfoMovie(
      `${movie.certification} • ${data} (${movie.language}) • ${genres} ${
        movie.runtime !== null ? `• ${runtime}` : ""
      }`
    );
  };

  return { infoMovie, setInfo };
};

export default useSetInfoMovie;
