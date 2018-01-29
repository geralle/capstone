import React, { Component } from 'react';
import Calendar from '../components/client/Calendar'
import NewAppt from '../components/client/NewAppt.js'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class Homepage extends Component {
  render() {
    return (
      <div className="main-container">
        <Calendar />
        <NewAppt/>
      </div>
    );
  }
}

export default Homepage;
