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
                  <Route exact strict path="/"  component={Home}/>
                  <Route exact strict path="/download/:network.pdf" component={() => <Download filename="network.pdf"/>}/>
                  <Route exact strict Path="/download/:CSE_310.zip" exact component={() => <Download filename="CSE_310.zip"/>}/>
              </Switch>
          </Router>
    </div>

  );
}

export default App;
