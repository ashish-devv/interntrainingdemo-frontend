import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Routes, Route, Switch } from "react-router-dom";
import Navbarr from "./components/Navbarr";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Navbarr />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/about" component={About} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
