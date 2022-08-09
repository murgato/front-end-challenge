import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
const Movies = lazy(() => import("../movies"));
const Movie = lazy(() => import("../movie"));

const Routing = () => {
  return (
    <Routes>
      <Route path="movies/page=:page" element={<Movies />} />;
      <Route path="movie/:id" element={<Movie />} />
      <Route path="*" element={<Navigate to="/movies/page=1" />} />
    </Routes>
  );
};

export default Routing;
