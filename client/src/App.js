import React from "react";
import Fundings from "./pages/Fundings";
import FundingDetails from "./pages/FundingDetails";
import { Switch, Route } from "react-router-dom";
import Donate from "./pages/Donate";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/fundings/:id">
          <FundingDetails />
        </Route>
        <Route exact path="/fundings">
          <Fundings />
        </Route>
        <Route exact path="/">
          <Fundings />
        </Route>
        <Route exact path="/fundings/new">
          <Fundings />
        </Route>
        <Route exact path="/fundings/:id/donate">
          <Donate />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
