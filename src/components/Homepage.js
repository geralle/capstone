import React, { Component } from 'react';
import Calendar from '../components/Calendar'
import About from '../components/About'
import LoginCreate from '../components/LoginCreate'

class Main extends Component {
  render() {
    return (
      <div className="main-container">
        <Calendar />
        <div className="about-logins">
          <About />
          <LoginCreate/>
        </div>
      </div>
    );
  }
}

export default Main;
