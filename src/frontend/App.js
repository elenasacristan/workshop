import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllUsers from "./Components/AllUsers";
import Men from "./Components/Men";
import Women from "./Components/Women";
import Adults from "./Components/Adults";
import Under18 from "./Components/Under18";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={AllUsers} />
          <Route exact path="/men" component={Men} />
          <Route exact path="/women" component={Women} />
          <Route exact path="/adults" component={Adults} />
          <Route exact path="/under18" component={Under18} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
