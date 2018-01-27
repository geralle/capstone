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

  userLogout(){
    var token = this.state.token
    document.cookie = 'token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    fetch('https://capstone-be.herokuapp.com/api/user/logout/'+token,{
      method:'POST',
      mode:'no-cors'
    })
    window.location.reload()
    this.setState({'token':''})
  }

  tokenExists(){
    if(this.state.token){
      // this.getUserInfo()
      return <div className="logged-in-header"><h5>Hi, <Link to='/myaccount'>Geralle!</Link></h5><button onClick={()=>this.userLogout()} className="client-login-btn btn btn-outline-warning">Log Out</button></div>
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
            {this.tokenExists()}
         </div>
       </header>
    );
  }
}

export default Header;
