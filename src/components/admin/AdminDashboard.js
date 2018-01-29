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
    // console.log(this.props.everything)
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
      var response = await fetch('https://capstone-be.herokuapp.com/api/appts/all')
      var allAppts = await response.json()
      this.setState({approvals:allAppts})
    }
  }

  militaryFormat(hour){
    var militaryHour = 0
    switch (hour) {
      case 1:
        militaryHour = 13
        break;
      case 2:
        militaryHour = 14
        break;
      case 3:
        militaryHour = 15
        break;
      case 4:
        militaryHour = 16
        break;
      case 5:
        militaryHour = 17
        break;
      case 6:
        militaryHour = 18
        break;
      case 7:
        militaryHour = 19
        break;
      case 8:
        militaryHour = 20
        break;
      case 9:
        militaryHour = 21
        break;
      case 10:
        militaryHour = 22
        break;
      case 11:
        militaryHour = 23
        break;
      case 12:
        militaryHour = 24
        break;
      default:
        break;
    }
    return militaryHour
  }

  async createEvent(start, end, email, description){
    var event = {
      "start": {
        "dateTime": start
      },
      "end": {
        "dateTime": end
      },
      "description": description,
      "summary": "APPOINTMENT APPROVED!",
      "sendNotifications":true,
      "attendees": [
        {
          "email": email
        }
      ]
    }

    var request = await this.props.gapi.client.request({
        'method': 'POST',
        'path': '/calendar/v3/calendars/primary/events',
        'params': {'sendNotifications': 'true'},
        'body': event
    });

    console.log(request)
    window.location.reload()
  }

  mapApprovals(){
    return this.props.everything.map((data, index)=>{
      var clientName = data.title.split('_')
      var approveUrl = "https://capstone-be.herokuapp.com/api/approveappt/"+data.id+"/edit?_method=PUT"
      var deleteApproval = "https://capstone-be.herokuapp.com/api/appts/"+data.id+"/delete?_method=DELETE"
      var minute = '' + data.minute
      var month = '' + data.month
      if(minute.length < 2){
        minute = data.minute + '0'
      }
      if(month.length < 2){
        month = '0' + data.month
      }
      var apptDate = data.month + '/' + data.day + '/' + data.year
      var apptTime = data.hour + ':' + minute + data.ampm

      if(!data.approved){
        var hour = this.militaryFormat(data.hour) + ':' + minute
        var endHour = (this.militaryFormat(data.hour) +1) + ':' + minute
        var eventStart = data.year+'-'+month+'-'+data.day+'T'+ hour +':00-07:00'
        var eventEnd = data.year+'-'+month+'-'+data.day+'T'+endHour+':00-07:00'
        return <div className="approval-item" key={index}>
                  <form className="approval-container col" method="post" action={approveUrl}>
                    <div className="form-group">
                      {/* <h5>{clientName[0]}</h5> */}
                      <input className="form-control" type="hidden" name="id" value={data.id}></input>
                      <div className="appt-approval-container">
                        <p className="appt-approval-date col">{apptDate}</p>
                        <p className="appt-approval-time col">{apptTime}</p>
                        <input type="hidden" value={eventStart}></input>
                        <button className="approval-btn btn btn-success" onClick={()=>this.createEvent(eventStart, eventEnd, data.email, data.description)}>Approve</button>
                      </div>
                    </div>
                  </form>
                  <form className="approval-delete-container" method="post" action={deleteApproval}>
                    <div className="form-group">
                      <input className="form-control" type="hidden" name="id" value={data.id}></input>
                      <div className="appt-approval-container">
                        <button className="btn btn-danger">DELETE</button>
                      </div>
                    </div>
                  </form>
                </div>
          }
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
            <div className="align-title-center">
              <h3>Admin Info</h3>
            </div>
            {this.adminForm()}
          </div>
          <div className="event-container col">
            <div className="align-title-center">
              <h3>Events</h3>
            </div>
            {this.mapEvents()}
          </div>
          <div className="approval-container col">
            <div className="align-title-center">
              <h3>Approvals</h3>
            </div>
            {this.mapApprovals()}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
