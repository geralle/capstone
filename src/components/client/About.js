import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className="about-container">
        <div className="about-title">
          <h3>About</h3>
        </div>
        <div className="about-section">
          <p>
            Phone calls and drop in appointment scheduling is a pain for the client and the one providing the service. This app will alleviate scheduling conflicts, waste of time in the waiting room, and instances where both parties are not quite the right fit for each other.
          </p>
        </div>
      </div>
    );
  }
}

export default About;
