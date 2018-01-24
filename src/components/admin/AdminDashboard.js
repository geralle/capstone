import React, { Component } from 'react';

class AdminDashboard extends Component {

  somethingCool(){
    console.log('dashboard/events',this.props.events)
  }

  render() {
    return (
      <div>
        {this.somethingCool()}
        <h2>Admin Dashboard</h2>

      </div>
    );
  }
}

export default AdminDashboard;
