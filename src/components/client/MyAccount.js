import React, { Component } from 'react';

class MyAccount extends Component {

  getUserInfo(){
    fetch('https://galvanize-cors-proxy.herokuapp.com/https://capstone-be.herokuapp.com/api/user/all')
    .then(res => res.json()
    .then(data => console.log(data)))
  }

  render() {
    return (
      <div className="user-dashboard-container">
        {this.getUserInfo()}
        <h2>My Account</h2>
      </div>
    );
  }
}

export default MyAccount;
