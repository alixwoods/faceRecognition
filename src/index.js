import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { ScrollContext } from "react-router-scroll-4";

// import routes
import Routes from "./routes";

export function App() {
  return (
    <HashRouter>
      <BrowserRouter basename={"/"}>
        <ScrollContext>
          <Routes />
        </ScrollContext>
      </BrowserRouter>
    </HashRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
