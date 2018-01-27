import React, { Component } from 'react';
import Events from './Events'

class AdminDashboard extends Component {
  constructor(){
    super()
    this.state = {
      allAppts: {},
      approvals: []
    }
  }

  componentDidMount(){
    this.getAllAppts()
  }

  mapEvents(){
    return this.props.events.map((data,index)=>{
      var fullStartDT = new Date(data.start.dateTime)
      var fullEndDT = new Date(data.end.dateTime)
      var startTime = this.formatTime(fullStartDT)
      var endTime = this.formatTime(fullEndDT)
      return <Events
                eventsName={data.summary}
                eventStartTime={startTime}
                eventEndTime={endTime}
                key={index}
              />
    })
  }

  formatTime(fullDT){
    var hours = fullDT.getHours()
    var minutes = fullDT.getMinutes() + ''
    if(minutes.length<2){
      minutes = minutes +'0'
    }
    var time = hours + ":" + minutes
    return time
  }

  async getAllAppts(){
    if(this.props.signedIn){
      var response = await fetch('https://galvanize-cors-proxy.herokuapp.com/https://capstone-be.herokuapp.com/api/appts/all')
      var allAppts = await response.json()
      this.setState({approvals:allAppts})
    }
  }

  mapApprovals(){
    return this.state.approvals.map((data, index)=>{
      // console.log(data)
      var url = "https://galvanize-cors-proxy.herokuapp.com/https://capstone-be.herokuapp.com/api/approveappt/" + data.id + ":id/edit?_method=PUT"
      var minute = '' + data.minute
      if(minute.length < 2){
        minute = data.minute + '0'
      }
      var apptTime = data.month + '/' + data.day + '/' + data.year + ' ' + data.hour + ':' + minute + data.ampm
      console.log(apptTime)
      return <form className="container" method="post" action={url} key={index}>
      <div className="form-group">
        <input className="form-control" type="hidden" name="id" value={data.id}></input>
        <div className="appt-approval-container">
          <p className="appt-approval-time">{apptTime}</p>
          <button className="approval-btn btn btn-success">Approve</button>
        </div>
      </div>
      </form>
    })
  }

  events(){
    console.log('dashboard/events',this.props.events)
  }

  adminForm(){
    return <form className="container" method="post" action="/api/admin/edit?_method=PUT">
        <input type="hidden" name="id" value="2"></input>
        <div className="form-group">
          <input className="form-control" type="text" name="email" placeholder="Email"></input>
        </div>
        <div className="form-group">
          <input className="form-control" type="text" name="name" placeholder="Name"></input>
        </div>
        <div className="form-group">
          <input className="form-control" type="text" name="phone_number" placeholder="Phone Number"></input>
        </div>
        <div className="form-group">
          <input className="form-control" type="text" name="calendar_id" placeholder="Calendar Id"></input>
        </div>
        <div className="form-group">
          <input className="form-control" type="text" name="about" placeholder="About"></input>
        </div>
        <div className="form-group">
          <input className="form-control" type="text" name="address" placeholder="Address"></input>
        </div>
        <div className="form-group">
          <input className="form-control" type="text" name="city" placeholder="City"></input>
        </div>
        <div className="form-group">
          <input className="form-control" type="text" name="state" placeholder="State"></input>
        </div>
        <div className="form-group">
          <input className="form-control" type="number" name="zipcode" placeholder="Zipcode"></input>
        </div>
        <button type="submit" className="btn btn-info">Save</button>
      </form>
  }

  render() {
    return (
      <div>
        <div className="dashboard-title">
          <h2>Admin Dashboard</h2>
        </div>
        <div className="dashboard-container">
          <div className="admin-info-container col">
            <h2>Admin Info</h2>
            {this.adminForm()}
          </div>
          <div className="event-container col">
            <h2>Events</h2>
            {this.mapEvents()}
          </div>
          <div className="approval-container col">
            <h2>Approvals</h2>
            {this.mapApprovals()}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
