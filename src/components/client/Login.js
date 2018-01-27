import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Register from './Register'

class Login extends Component {
  constructor(){
    super()
    this.state = {
      token: ''
    }
  }

  componentDidMount(){
    this.getToken()
  }

  async getToken(){
    var response = await fetch('https://galvanize-cors-proxy.herokuapp.com/https://capstone-be.herokuapp.com/api/generatetoken')
    var token = await response.json()
    this.setState({token:token.token})
  }

  generateToken(){
    var token = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 30; i++){
      token += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return token;
  }

  postToken(){
    document.cookie = 'token=' + this.state.token;
    console.log(this.state.token)
  }

  render() {
    return (
      <div className="login-container">
        {/* <button onClick={()=>this.postToken()}>please</button> */}
        <form className="login-form" method="post" action="https://capstone-be.herokuapp.com/api/user/login">
          <h3>Login</h3>
          <input type="hidden" className="form-control" name="token" value={this.state.token}></input>
          <div className="form-group login-input">
            <input type="email" className="form-control" name="email" placeholder="Email" required></input>
          </div>
          <div className="form-group login-input">
            <input type="password" className="form-control" name="password" placeholder="Password" required></input>
          </div>
          <div className="lower-form">
            <div>
              <button type="submit" className="btn btn-warning" onClick={()=>this.postToken()}>Submit</button>
              <a href="#" className="forgot-password">Forgot you password?</a>
            </div>
            <div className="create-account-container">
              <span>Don't have an account?</span>
              <Link to='/register' className="create-account-btn">Create one!</Link>
            </div>
            <Link to='/admin' className="client-login-btn btn btn-outline-danger">Admin</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
