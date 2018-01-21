import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar'
import About from './components/About'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="logged-in-user">
            <h5>Hi, <a href="#">Geralle!</a></h5>
            <button className="logout-btn btn btn-primary">Logout</button>
          </div>
        </header>
        <div className="main-container">
          <Calendar />
          <About />
        </div>
      </div>
    );
  }
}

export default App;
