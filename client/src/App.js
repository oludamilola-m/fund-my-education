import React from "react";
import Fundings from "./pages/Fundings";
import FundingDetails from "./pages/FundingDetails";
import { Switch, Route } from "react-router-dom";

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
      </Switch>
    </div>
  );
}

export default App;
