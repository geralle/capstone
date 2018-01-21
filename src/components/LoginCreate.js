import React, { Component } from 'react';

class LoginCreate extends Component {
  render() {
    return (
      <div className="login-container">
        <form className="login-form">
          <h3>Login</h3>
          <div className="form-group login-input">
            <input type="email" className="form-control" name="login-username" placeholder="Username"></input>
          </div>
          <div className="form-group login-input">
            <input type="password" className="form-control" name="login-password" placeholder="Password"></input>
          </div>
          <div className="lower-form">
            <div>
              <button type="submit" className="btn btn-primary">Submit</button>
              <a href="#" className="forgot-password">Forgot you password?</a>
            </div>
            <div>
              <span>Don't have an account?</span>
              <a href="#" className="create-account-btn">Create One!</a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginCreate;
