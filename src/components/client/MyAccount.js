import React, { Component } from 'react';

class MyAccount extends Component {
  constructor(){
    super()
    this.state = {
      token: '',
      userInfo: {}
    }
  }

  componentDidMount(){
    this.parseToken()
    console.log(this.state.token)
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
    this.tokenExists(token)
  }

  async getUserInfo(token){
    var response = await fetch('https://galvanize-cors-proxy.herokuapp.com/https://capstone-be.herokuapp.com/api/usertoken/'+token)
    var userInfo = await response.json()
    return userInfo
  }

  async tokenExists(token){
    if(token){
      var userInfo = await this.getUserInfo(token)
      this.setState({'userInfo': userInfo})
    }
  }

  myInfo(){

  }

  render() {
    return (
      <div className="user-dashboard-container">
        <h2>My Account</h2>
        <div className="my-account-container">
          <div className="appt-history-container col">
            <h4>Appointment History</h4>
          </div>
          <div className="chat-container col">
            <h4>Chat</h4>
          </div>
          <div className="account-details-container col">
            <form class="container" method="post" action="https://capstone-be.herokuapp.com/api/user/edit?_method=PUT">
              <h3>Edit User</h3>
              <input type="hidden" name="id" value="3"></input>
              <div class="form-group">
                <input class="form-control col-4" type="text" name="f_name" value={this.state.userInfo.f_name}></input>
              </div>
              <div class="form-group">
                <input class="form-control col-4" type="text" name="l_name" value={this.state.userInfo.l_name}></input>
              </div>
              <div class="form-group">
                <input class="form-control col-4" type="text" name="email" value={this.state.userInfo.email}></input>
              </div>
              <div class="form-group">
                <input class="form-control col-4" type="password" name="password" value={this.state.userInfo.password}></input>
              </div>
              <div class="form-group">
                <input class="form-control col-4" type="text" name="phone_number" value={this.state.userInfo.phone_number}></input>
              </div>
              <button type="submit" class="btn btn-info">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MyAccount;
