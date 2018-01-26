import React, { Component } from 'react';

class Register extends Component {
  render() {
    return (
      <div className="register-container">
        <form className="register-form" method="post" action="http://localhost:8000/api/user/create">
        <h3>Create Your Account</h3>
        <div className="form-group register-input">
          <input className="form-control col-4" type="text" name="f_name" placeholder="First Name" required></input>
        </div>
        <div className="form-group register-input">
          <input className="form-control col-4" type="text" name="l_name" placeholder="Last Name" required></input>
        </div>
        <div className="form-group register-input">
          <input className="form-control col-4" type="email" name="email" placeholder="Email" required></input>
        </div>
        <div className="form-group register-input">
          <input className="form-control col-4" type="password" name="password" placeholder="Password" required></input>
        </div>
        <div className="form-group register-input">
          <input className="form-control col-4" type="text" name="phone_number" placeholder="Phone Number" required></input>
        </div>
        <button type="submit" className="register-btn-submit btn btn-info">Create</button>
      </form>
      </div>
    );
  }
}

export default Register;
