import React, { Component } from 'react';

class Events extends Component {

  render() {
    return (
      <div className="event-schedule">
        <div className="approval-delete-container col">
          <div className="title-time-container">
            <h2>{this.props.eventsName}</h2>
            <div className="time-button-container">
              <div className="appt-time">
                <p>{this.props.eventDate} | {this.props.eventStartTime}-{this.props.eventEndTime}</p>
              </div>
            </div>
          </div>
          <div className="description-container">
            <p>description: {this.props.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
