import { create } from "apisauce";

// define the api
export const api = create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Accept: "application/json",
  },
});
