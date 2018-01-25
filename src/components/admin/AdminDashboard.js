import React, { Component } from 'react';
import Events from './Events'

class AdminDashboard extends Component {

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

  events(){
    console.log('dashboard/events',this.props.events)
  }

  render() {
    return (
      <div>
        {this.events()}
        <h2>Admin Dashboard</h2>
        <div className="event-container">
          <h2>Events</h2>
          {this.mapEvents()}
        </div>

      </div>
    );
  }
}

export default AdminDashboard;
