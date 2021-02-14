import React from "react";
import { Route, Switch } from "react-router-dom";
import BrandDetail from "./pages/brands/BrandDetail";
import Brands from "./pages/brands/index";
import NotFound from "./pages/NotFound";
import Orders from "./pages/orders";

const Routes = (properties) => {
  return (
    <Switch>
      <Route exact path="/" component={Brands} />
      <Route
        exact
        path="/brand/:id"
        render={(props) => <BrandDetail {...props} {...properties} />}
      />
      <Route exact path="/orders" component={Orders} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
