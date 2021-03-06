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
      var date = fullStartDT.getMonth()+1 +'/'+ fullStartDT.getDate() +'/'+ fullStartDT.getFullYear()
      return <Events
                eventDate={date}
                description={data.description}
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
    return allAppts
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

  async createEvent(title, eventId, start, end, email, description){
    var event = {
      "start": {
        "dateTime": start
      },
      "end": {
        "dateTime": end
      },
      "description": description,
      "summary": title,
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
    })

    var dbRequest = await fetch('https://capstone-be.herokuapp.com/api/approveappt/'+eventId+'/edit', {
      method:'PUT',
      mode: 'cors',
      redirect: 'follow',
      headers: new Headers({'Content-Type': 'text/plain'})
    }).then(function(data){
    })
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
      var apptDate = month + '/' + data.day + '/' + data.year
      var apptTime = data.hour + ':' + minute + data.ampm

      if(!data.approved){
        var hour = this.militaryFormat(data.hour) + ':' + minute
        var endHour = (this.militaryFormat(data.hour) +1) + ':' + minute
        var eventStart = data.year+'-'+month+'-'+data.day+'T'+ hour +':00-07:00'
        var eventEnd = data.year+'-'+month+'-'+data.day+'T'+endHour+':00-07:00'
        return  <div className="approval-item" key={index}>
                  <div className="approval-delete-container col">
                    <div className="title-time-container">
                      <h2>{data.title}</h2>
                      <div className="time-button-container">
                        <div className="day-time-container">
                          <p>{apptDate} @{apptTime}</p>
                        </div>
                        <div className="approve-deny-container">
                          <button className="approval-btn btn btn-success" onClick={()=>this.createEvent(data.title,data.id, eventStart, eventEnd, data.email, data.description)}>APPROVE</button>
                          <form className="delete-container" method="post" action={deleteApproval}>
                            <input className="form-control" type="hidden" name="id" value={data.id}></input>
                            <button className="delete-btn btn btn-danger">DELETE</button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="description-container">
                      <p>{data.description}</p>
                    </div>
                  </div>
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
      <div className="">
        <div className="dashboard-title">
          <h1>Admin Dashboard</h1>
          <button className=" btn btn-warning" id="signout-button" onClick={()=>this.props.adminSignout()}>Sign Out</button>
        </div>
        <div className="dashboard-container">
          <div className="admin-info-container col">
            <div className="align-title-center">
              <h3>Admin Info</h3>
            </div>
            {this.adminForm()}
          </div>
          <div className="chat-container col">
            <div className="align-title-center">
              <h3>Chat</h3>
            </div>
            <iframe src={process.env.PORT} frame="0" className="chat-container-frame"></iframe>
          </div>
          <div className="event-container col">
            <div className="align-title-center">
              <h3>Appointments</h3>
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
