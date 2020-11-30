import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Index } from "./pages/index";
import { Settings } from "./pages/settings";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/settings" component={Settings} />
        <Route path="/" component={Index} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<AppRouter />, document.getElementById("index"));
