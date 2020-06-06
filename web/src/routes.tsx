import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home/Home";
import CreatePoint from "./pages/createPoint/CreatePoint";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/create-point" exact component={CreatePoint} />
    </BrowserRouter>
  );
};

export default Routes;
