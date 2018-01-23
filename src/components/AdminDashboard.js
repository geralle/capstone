import React, { Component } from 'react';

class AdminDashboard extends Component {

  somethingCool(){
    console.log(this.props.gapi)
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
