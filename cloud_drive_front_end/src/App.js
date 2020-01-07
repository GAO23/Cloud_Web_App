import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./components/home";
import Download from "./components/download";

function App() {
  return (
    <div className="App">
          <Router>
              <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route Path='/download/:content' exact component={(props) => <Download {...props}/>}/>
              </Switch>
          </Router>
    </div>

  );
}

export default App;
