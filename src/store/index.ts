import { applyMiddleware, createStore, Store } from "redux";
import { IMoviesStates } from "./ducks/movies/types";
import rootReducer from "./ducks/rootReducer";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./ducks/rootSaga";

export interface ApplicationState {
  movies: IMoviesStates;
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
