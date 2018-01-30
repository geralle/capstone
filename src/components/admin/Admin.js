import React, { Component } from 'react';
import AdminDashboard from './AdminDashboard'

class Admin extends Component {
  constructor(){
    super()
    this.state = {
      gapi: '',
      signedIn: '',
      events: [],
      adminInfo: {},
      calendarObj: {},
      allUserAppts: []
    }
  }

  componentDidMount(){
    this.loadApi(this)
    this.getAllUsersAndAppts()
  }

  async loadApi(isThis) {
    var gapi = await require('google-client-api')()
    this.setState({gapi: gapi})
    this.initClient()
  }

  async getAllUsersAndAppts(){
    var request = await fetch('http://capstone-be.herokuapp.com/api/users/appts/all')
    var everything = await request.json()
    this.setState({allUserAppts: everything})
  }

  async initClient(){
    var calendarObj = {}
    await this.state.gapi.client.init({
      apiKey: process.env.REACT_APP_API_KEY,
      clientId: process.env.REACT_APP_CLIENT_ID,
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
      scope: "https://www.googleapis.com/auth/calendar"
    })
    let signedIn = this.state.gapi.auth2.getAuthInstance().isSignedIn.get()
    let gAuthData = this.state.gapi.auth2.getAuthInstance()
    this.updateSigninStatus(signedIn);
    if(signedIn === true){
      var gAuthObj = {
        email: gAuthData.currentUser.Ab.w3.U3,
        name: gAuthData.currentUser.Ab.w3.ig,
        subname: gAuthData.currentUser.Ab.w3.ofa,
        profilePhoto: gAuthData.currentUser.Ab.w3.Paa
      }
      let request = await this.state.gapi.client.calendar.calendarList.list();
      let calendars = request.result.items
      for(var i=0; i<calendars.length; i++){
        calendarObj[i] = [calendars[i].summary, calendars[i].id]
      }
      this.setState({signedIn: signedIn, adminInfo:gAuthObj, calendarObj:calendarObj})
    }
  }

  updateSigninStatus(isSignedIn) {
    var authorizeButton = document.getElementById('authorize-button');
    // var signoutButton = document.getElementById('signout-button');
    if (isSignedIn) {
      authorizeButton.style.display = 'none';
      // signoutButton.style.display = 'block';
      this.listUpcomingEvents();
    } else {
      authorizeButton.style.display = 'block';
      // signoutButton.style.display = 'none';
    }
  }

  async handleAuthClick(event) {
    await this.state.gapi.auth2.getAuthInstance().signIn();
    window.location.reload()
  }

  handleSignoutClick(event) {
    this.state.gapi.auth2.getAuthInstance().signOut();
    window.location.reload()
  }

  setTheState(){
    return this
  }

  async listUpcomingEvents() {
    var scopeThis = this.setTheState()
    var response = await this.state.gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 100,
      'orderBy': 'startTime'
    })
    var events = response.result.items;
    this.setState({events: events})
  }

  showDashboard(){
    if(this.state.signedIn===true){
      return <AdminDashboard
        gapi={this.state.gapi}
        events={this.state.events}
        signedIn={this.state.signedIn}
        everything={this.state.allUserAppts}
        adminSignout={() => this.handleSignoutClick()}
      />
    }
  }

  render() {
    return (
      <div className="admin-container">
        <div className="authorize-container">
          <button className="btn btn-warning" id="authorize-button" onClick={()=>this.handleAuthClick()}>Authorize</button>
          {/* <button className="btn btn-warning" id="signout-button" onClick={()=>this.handleSignoutClick()}>Sign Out</button> */}
        </div>
        {this.showDashboard()}
      </div>
    );
  }
}

export default Admin;
