import React, { Component } from 'react';
import AdminDashboard from './AdminDashboard'

class Admin extends Component {
  constructor(){
    super()
    this.state = {
      gapi: '',
      signedIn: '',
      events: []
    }
  }

  componentDidMount(){
    this.loadApi(this)
  }

  async loadApi(isThis) {
    await require('google-client-api')().then(function(gapi){
      isThis.setState({gapi: gapi})
      isThis.initClient()
    });
  }

  async initClient(){
    var calendarObj = {}
    await this.state.gapi.client.init({
      apiKey: process.env.REACT_APP_API_KEY,
      clientId: process.env.REACT_APP_CLIENT_ID,
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
      scope: "https://www.googleapis.com/auth/calendar.readonly"
    })
    let signedIn = this.state.gapi.auth2.getAuthInstance().isSignedIn.get()
    this.setState({signedIn: signedIn})
    let gAuthData = this.state.gapi.auth2.getAuthInstance()
    this.updateSigninStatus(signedIn);
    if(signedIn === true){
      var gAuthObj = {
        token: gAuthData.currentUser.Ab.Zi.access_token,
        email: gAuthData.currentUser.Ab.w3.U3,
        name: gAuthData.currentUser.Ab.w3.ig,
        subname: gAuthData.currentUser.Ab.w3.ofa,
        profilePhoto: gAuthData.currentUser.Ab.w3.Paa
      }
      let request = this.state.gapi.client.calendar.calendarList.list();
      request.then(function(calendarData){
        let calendars = calendarData.result.items;
        for(var i=0; i<calendars.length; i++){
          calendarObj[i] = [calendars[i].summary, calendars[i].id]
        }
      })
    }
  }

  updateSigninStatus(isSignedIn) {
    var authorizeButton = document.getElementById('authorize-button');
    var signoutButton = document.getElementById('signout-button');
    if (isSignedIn) {
      authorizeButton.style.display = 'none';
      signoutButton.style.display = 'block';
      this.listUpcomingEvents();
    } else {
      authorizeButton.style.display = 'block';
      signoutButton.style.display = 'none';
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

  listUpcomingEvents() {
    var scopeThis = this.setTheState()

    this.state.gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 100,
      'orderBy': 'startTime'
    }).then(function(response) {
      var events = response.result.items;
      scopeThis.setState({events: events})
    });
  }

  showDashboard(){
    if(this.state.signedIn===true){
      return <AdminDashboard gapi={this.state.gapi} events={this.state.events}/>
    }
  }

  render() {
    return (
      <div className="admin-container">
        <button className="btn btn-primary" id="authorize-button" onClick={()=>this.handleAuthClick()}>Authorize</button>
        <button className="btn btn-info" id="signout-button" onClick={()=>this.handleSignoutClick()}>Sign Out</button>
        {this.showDashboard()}
      </div>
    );
  }
}

export default Admin;
