import React from "react";
import Fundings from "./pages/Fundings";
import FundingDetails from "./pages/FundingDetails";
import Header from "./pages/Header";
import { Switch, Route } from "react-router-dom";
import Donate from "./pages/Donate";
import NewFunding from "./pages/NewFunding";
import Registration from "./pages/Registration";

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route exact path="/register">
          <Registration />
        </Route>
        <Route exact path="/fundings/new">
          <NewFunding />
        </Route>
        <Route exact path="/fundings/:id">
          <FundingDetails />
        </Route>
        <Route exact path="/fundings">
          <Fundings />
        </Route>
        <Route exact path="/">
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
