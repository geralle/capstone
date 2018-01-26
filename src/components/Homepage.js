import React, { Component } from 'react';
import Calendar from '../components/client/Calendar'
import About from '../components/client/About'
import Login from '../components/client/Login'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class Homepage extends Component {
  render() {
    return (
      <div className="main-container">
        <Calendar />
      </div>
    );
  }
}

export default Homepage;
