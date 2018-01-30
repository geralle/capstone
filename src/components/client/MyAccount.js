import React, { Component } from 'react';
import $ from 'jquery';

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
    var response = await fetch('https://capstone-be.herokuapp.com/api/usertoken/'+token)
    var userInfo = await response.json()
    return userInfo
  }

  async getUsersAppts(){
    var url = 'https://capstone-be.herokuapp.com/api/user/appts/'+this.state.userInfo.id
    var response = await fetch(url)
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
    var apptArr = this.state.userAppts.appointments
    if(apptArr != undefined){
      return apptArr.map((data, index)=>{
        var hour = data.hour
        var minute = data.minute + ''
        if(minute.length < 2){
          minute = "0" + minute
        }
        var date = data.month +'/'+ data.day +'/'+ data.year
        return <div className="approval-delete-container" key={index}>
          <div className="title-time-container">
            <h2>{data.title}</h2>
            <div className="time-button-container">
              <div className="appt-time">
                <p>{date} | {hour}:{minute} {data.ampm}</p>
              </div>
            </div>
          </div>
          <div className="description-container">
            <p>description: {data.description}</p>
          </div>
        </div>
      })
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
          <h1>My Account</h1>
        </div>
        <div className="my-account-container">
          <div className="appt-history-container col">
            <div className="align-title-center">
              <h3>Appointment History</h3>
            </div>
            <div className="appt-history-container">
              {this.mapAppts()}
            </div>
          </div>
          <div className="chat-container col">
            <div className="align-title-center">
              <h3>Chat</h3>
            </div>
            <iframe src="http://localhost:3000" className="chat-container-frame"></iframe>
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
