import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import logo from '../logo.svg';
import Admin from '../components/Admin'

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <Link to='/'>
         <img src={logo} className="App-logo" alt="logo" />
        </Link>
         <div className="logged-in-user">
            <h5>Hi, <Link to='/myaccount'>Geralle!</Link></h5>
            <button className="logout-btn btn btn-primary">Logout</button>
            <Link to='/admin' className="admin-login-btn btn btn-primary">
              Admin
            </Link>
         </div>
       </header>
    );
  }
}

export default Header;
