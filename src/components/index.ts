import { lazy } from "react";
const Header = lazy(() => import("./Header"))
const ListGenres = lazy(() => import("./ListGenres"));
const MiniMovie = lazy(() => import("./MiniMovie"));
const Pagination = lazy(() => import("./Pagination"));
const NotFound = lazy(() => import("./Notfound"));

export { Header, ListGenres, MiniMovie, Pagination, NotFound };
