import React, { Component } from 'react';
import Calendar from '../components/client/Calendar'
import About from '../components/client/About'
import LoginCreate from '../components/client/LoginCreate'

class Main extends Component {
  render() {
    return (
      <div className="main-container">
        <Calendar />
        {/* <div className="about-logins">
          <About />
          <LoginCreate/>
        </div> */}
      </div>
    );
  }
}

export default Main;
