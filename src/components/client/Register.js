import React, { Component } from 'react';

class Register extends Component {
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
    var response = await fetch('https://capstone-be.herokuapp.com/api/generatetoken')
    var token = await response.json()
    this.setState({token:token.token})
  }

  postToken(){
    document.cookie = 'token=' + this.state.token;
    console.log(this.state.token)
  }

  render() {
    return (
      <div className="register-container">
        <form className="register-form" method="post" action="https://capstone-be.herokuapp.com/api/user/create">
          <h3>Create Your Account</h3>
          <input type="hidden" className="form-control" name="token" value={this.state.token}></input>
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
          <button type="submit" className="register-btn-submit btn btn-info" onClick={()=>this.postToken()}>Create</button>
        </form>
      </div>
    );
  }
}

export default Register;
