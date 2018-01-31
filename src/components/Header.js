import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import logo from '../g-logo-thick.png';
import Admin from '../components/admin/Admin'
import Login from '../components/client/Login'
import Collapsible from 'react-collapsible';

class Header extends Component {
  constructor(){
    super()
    this.state = {
      token: '',
      userInfo: {}
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

  async getUserInfo(){
    var response = await fetch('https://capstone-be.herokuapp.com/api/usertoken/'+this.state.token)
    var userInfo = await response.json()
    this.setState({'userInfo': userInfo})
  }

  async getToken(){
    var response = await fetch('https://capstone-be.herokuapp.com/api/generatetoken')
    var token = await response.json()
    this.setState({token:token.token})
  }

  async userLogout(){
    console.log('logout')
    var token = this.state.token
    // document.cookie = 'token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    await fetch('https://capstone-be.herokuapp.com/api/user/logout/'+token,{
      method:'POST'
    })
    this.setState({'token':''})
  }

  tokenExists(){
    if(this.state.token){
      this.getUserInfo()
      return <div className="logged-in-header"><h5>Hi, <Link to='/myaccount'>{this.state.userInfo.f_name}!</Link></h5>
      <form action={"https://capstone-be.herokuapp.com/api/user/logout/"+ this.state.token} method="post">
        <button className="client-login-btn btn btn-outline-warning" onClick={()=>this.userLogout()}>Log Out</button>
      </form>
      </div>
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
