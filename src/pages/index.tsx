import { Suspense, useState } from "react";
import { Provider } from "react-redux";
import { Header } from "../components";
import store from "../store";
import Loading from "./Loading";
import Routes from "./routes";
function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Provider store={store}>
          <Header />
          <Routes />
        </Provider>
      </Suspense>
    </div>
  );
}

export default App;
