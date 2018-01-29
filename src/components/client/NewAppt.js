import React, { Component } from 'react';

class NewAppt extends Component {
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
    this.tokenExists(token)
  }

  async getUserInfo(token){
    var response = await fetch('https://capstone-be.herokuapp.com/api/usertoken/'+token)
    var userInfo = await response.json()
    return userInfo
  }

  async tokenExists(token){
    if(token){
      var userInfo = await this.getUserInfo(token)
      this.setState({'userInfo': userInfo})
    }
  }

  toggleForm(){
    if(this.state.token){
      return <div>
        <form className="container" method="post" action="https://capstone-be.herokuapp.com/api/appointment/create">
          <h3>Create Appointment</h3>
          <input type="hidden" name="user_id" value={this.state.userInfo.id}></input>
          <input type="hidden" name="f_name" value={this.state.userInfo.f_name}></input>
          <div className="appt-select-container">
            <div className="appt-select">
              <div className="form-group">
                <select className="form-control" name="month" >
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div className="form-group">
                <input className="form-control" type="number" min="1" max="31" name="day" placeholder="1" ></input>
              </div>
              <div className="form-group">
                <input className="form-control" type="text" name="year" defaultValue="2018" ></input>
              </div>
              <div className="form-group">
                <select className="form-control" name="hour" >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div className="form-group">
                <h4>:</h4>
              </div>
              <div className="form-group">
                <select className="form-control" name="minute" >
                  <option>00</option>
                  <option>30</option>
                </select>
              </div>
              <div className="form-group">
                <select className="form-control" name="ampm" >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>
            <div className="appt-select">
              <div className="form-group">
                <select className="form-control" name="month" >
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div className="form-group">
                <input className="form-control" type="number" min="1" max="31" name="day" value="1" ></input>
              </div>
              <div className="form-group">
                <input className="form-control" type="text" name="year" defaultValue="2018" ></input>
              </div>
              <div className="form-group">
                <select className="form-control" name="hour" >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
              </div>
              <div className="form-group">
                <h4>:</h4>
              </div>
              <div className="form-group">
                <select className="form-control" name="minute" >
                  <option>00</option>
                  <option>30</option>
                </select>
              </div>
              <div className="form-group">
                <select className="form-control" name="ampm" >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>
            <div className="appt-select">
              <div className="form-group">
                <select className="form-control" name="month" >
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div className="form-group">
                <input className="form-control" type="number" min="1" max="31" name="day" value="1" ></input>
              </div>
              <div className="form-group">
                <input className="form-control" type="text" name="year" defaultValue="2018" ></input>
              </div>
              <div className="form-group">
                <select className="form-control" name="hour" >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
              </div>
              <div className="form-group">
                <h4>:</h4>
              </div>
              <div className="form-group">
                <select className="form-control" name="minute" >
                  <option>00</option>
                  <option>30</option>
                </select>
              </div>
              <div className="form-group">
                <select className="form-control" name="ampm" >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-group">
            <textarea className="form-control" name="description" placeholder="Description" rows="3"></textarea>
          </div>
          <button type="submit" className="btn btn-info">Submit</button>
        </form>
      </div>
    }else{
      return <h2>Login to set an Appointment!</h2>
    }
  }

  render() {
    return (
      <div className="new-appointment col">
        {this.toggleForm()}
      </div>
    );
  }
}

export default NewAppt;
