import React, { Component } from 'react';

class MyAccount extends Component {
  constructor(){
    super()
    this.state = {
      token: '',
      userInfo: {},
      userAppts: []
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
    this.tokenExists(token)
  }

  async getUserInfo(token){
    var response = await fetch('https://galvanize-cors-proxy.herokuapp.com/https://capstone-be.herokuapp.com/api/usertoken/'+token)
    var userInfo = await response.json()
    return userInfo
  }

  async getUsersAppts(){
    var url = 'https://capstone-be.herokuapp.com/api/user/appts/'+this.state.userInfo.id
    var response = await fetch('https://galvanize-cors-proxy.herokuapp.com/'+url)
    var userAppts = await response.json()
    this.setState({userAppts: userAppts})
    this.mapAppts()
  }

  async tokenExists(token){
    if(token){
      var userInfo = await this.getUserInfo(token)
      this.setState({'userInfo': userInfo})
      var userAppts = await this.getUsersAppts()
    }
  }

  mapAppts(){
    var apptsHistory = document.getElementsByClassName('appt-history-container')[0]
    var apptArr = this.state.userAppts.appointments
    for(var i=0;i<apptArr.length;i++){
      var minute = '' + apptArr[i].minute
      if(minute.length < 2){
        minute = apptArr[i].minute + '0'
      }
      var apptTime = document.createElement('p')
      var apptDesc = document.createElement('p')
      var apptApproved = document.createElement('p')
      apptDesc.setAttribute('class', 'appt-desc')
      apptTime.setAttribute('class', 'appt-time')
      apptApproved.setAttribute('class', 'appt-approve')
      apptTime.innerText = apptArr[i].month + '/' + apptArr[i].day + '/' + apptArr[i].year + ' ' + apptArr[i].hour + ':' + minute + apptArr[i].ampm
      apptDesc.innerText = "Description: " + apptArr[i].description
      apptApproved.innerText = "Approved: " + apptArr[i].approved
      apptsHistory.append(apptTime)
      apptsHistory.append(apptDesc)
      apptsHistory.append(apptApproved)
    }
  }

  render() {
    return (
      <div className="user-dashboard-container">
        <h2>My Account</h2>
        <div className="my-account-container">
          <div className="appt-history-container col">
            <h4>Appointment History</h4>
            <div className="appt-history-container"></div>
          </div>
          <div className="chat-container col">
            <h4>Chat</h4>
          </div>
          <div className="account-details-container col">
            <form className="container" method="post" action="https://capstone-be.herokuapp.com/api/user/edit?_method=PUT">
              <h3>Edit User</h3>
              <input type="hidden" name="id" value="3"></input>
              <div className="form-group">
                <input className="form-control col-4" type="text" name="f_name" value={this.state.userInfo.f_name}></input>
              </div>
              <div className="form-group">
                <input className="form-control col-4" type="text" name="l_name" value={this.state.userInfo.l_name}></input>
              </div>
              <div className="form-group">
                <input className="form-control col-4" type="text" name="email" value={this.state.userInfo.email}></input>
              </div>
              <div className="form-group">
                <input className="form-control col-4" type="password" name="password" value={this.state.userInfo.password}></input>
              </div>
              <div className="form-group">
                <input className="form-control col-4" type="text" name="phone_number" value={this.state.userInfo.phone_number}></input>
              </div>
              <button type="submit" className="btn btn-info">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MyAccount;
