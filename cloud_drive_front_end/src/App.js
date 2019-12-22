import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./components/home";
import Download from "./components/download";

function App() {
  return (
    <div className="App">
          <Router>
              <Route path="/" exact component={Home}/>
              <Route path="/pdf" exact component={Download}/>
          </Router>
    </div>

  );
}

export default App;
