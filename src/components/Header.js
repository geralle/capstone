import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import logo from '../logo.svg';
import Admin from '../components/admin/Admin'
import Login from '../components/client/Login'
import Collapsible from 'react-collapsible';

class Header extends Component {
  constructor(){
    super()
    this.state = {
      token: ''
    }
  }

  componentDidMount(){
    this.parseToken()
  }

  parseToken(){
    var cookieArr = document.cookie.split(';')
    var cookie = ''
    var token = ''
    for(var i=0;i<cookieArr.length;i++){
      if(cookieArr[i].includes('token')){
        cookie = cookieArr[i].split('=')
        token = cookie[1]
      }
    }
    this.setState({'token':token})
  }

  toggleLogin(){
    if(this.state.token){

      return <div className="logged-in-header"><h5>Hi, <Link to='/myaccount'>Geralle!</Link></h5><Link to='/login' className="client-login-btn btn btn-outline-warning">Log Out</Link></div>
    }else{
      return <Link to='/login' className="client-login-btn btn btn-outline-warning">Login</Link>
    }
  }

  render() {
    return (
      <header className="App-header">
        <Link to='/'>
         <img src={logo} className="App-logo" alt="logo" />
        </Link>
         <div className="login-out-container">
            {this.toggleLogin()}
         </div>
       </header>
    );
  }
}

export default Header;
