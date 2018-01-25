import React, { Component } from 'react';

class Events extends Component {

  render() {
    return (
      <div className="event-schedule">
        <p className="event-name">{this.props.eventsName}</p>
        <p className="event-times">{this.props.eventStartTime}-{this.props.eventEndTime}</p>
      </div>
    );
  }
}

export default Events;
