import { useState } from "react";
const useVoteAveragePercent = () => {
  const [voteAverage, setVoteAverage] = useState<number>(0);

  const voteAveragePercent = (vote_average: number) => {
    let percent = Math.round((100 * vote_average) / 10);
    setVoteAverage(percent);
  };

  return { voteAverage, voteAveragePercent };
};
export default useVoteAveragePercent;
