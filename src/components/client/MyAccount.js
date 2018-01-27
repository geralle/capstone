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
    var apptCount = document.createElement('h4')
    var pendingApprovals = 0
    for(var pending in apptArr){
      if(!apptArr[pending].approved){
        pendingApprovals++
      }
    }
    apptCount.setAttribute('class', 'appointment-count')
    apptCount.innerText = "Submitted Appointments: " + pendingApprovals
    apptsHistory.append(apptCount)
    for(var i=0;i<apptArr.length;i++){
      if(apptArr[i].approved){
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
  }

  displayUserForm(){
    return <form className="container" method="post" action="https://capstone-be.herokuapp.com/api/user/edit?_method=PUT">
    <div className="align-title-center">
      <h3>Edit Info</h3>
    </div>
      <input type="hidden" name="id" defaultValue={this.state.userInfo.id}></input>
      <div className="form-group">
        <input className="form-control" type="text" name="f_name" defaultValue={this.state.userInfo.f_name} placeholder={this.state.userInfo.f_name}></input>
      </div>
      <div className="form-group">
        <input className="form-control" type="text" name="l_name" placeholder={this.state.userInfo.l_name} defaultValue={this.state.userInfo.l_name}></input>
      </div>
      <div className="form-group">
        <input className="form-control" type="text" name="email" defaultValue={this.state.userInfo.email} placeholder={this.state.userInfo.email}></input>
      </div>
      <div className="form-group">
        <input className="form-control" type="password" name="password" defaultValue={this.state.userInfo.password} placeholder={this.state.userInfo.password}></input>
      </div>
      <div className="form-group">
        <input className="form-control" type="text" name="phone_number" defaultValue={this.state.userInfo.phone_number} placeholder={this.state.userInfo.phone_number}></input>
      </div>
      <button type="submit" className="btn btn-info">Save</button>
    </form>
  }

  render() {
    return (
      <div className="user-dashboard-container">
        <div className="dashboard-title">
          <h2>My Account</h2>
        </div>
        <div className="my-account-container">
          <div className="appt-history-container col">
            <div className="align-title-center">
              <h3>Appointment History</h3>
            </div>
            <div className="appt-history-container"></div>
          </div>
          <div className="chat-container col">
            <div className="align-title-center">
              <h3>Chat</h3>
            </div>
          </div>
          <div className="account-details-container col">
            {this.displayUserForm()}
          </div>
        </div>
      </div>
    );
  }
}

export default MyAccount;
