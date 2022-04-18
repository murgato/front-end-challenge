import { IMovieStates } from "./../store/ducks/movie/types";
import { useState } from "react";
import { ICrew } from "../store/ducks/movie/types";

const useGetResponsable = () => {
  const [crew, setCrew] = useState<ICrew[]>([]);

  const getResponsable = (credits: IMovieStates["credits"]) => {
    let arrCharacters = credits.crew.filter(
      (crew) => crew.job === "Characters"
    );
    let arrDirector = credits.crew.filter((crew) => crew.job === "Director");
    let arrScreenplay = credits.crew.filter(
      (crew) => crew.job === "Screenplay"
    );

    let finalArr = arrCharacters.concat(arrDirector.concat(arrScreenplay));
    setCrew(finalArr);
  };

  return { crew, getResponsable };
};

export default useGetResponsable;
