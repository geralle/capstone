import React, { Component }  from 'react';
import { Switch, Route } from 'react-router-dom'
import Homepage from '../components/Homepage'
import Admin from '../components/admin/Admin'
import MyAccount from '../components/client/MyAccount'
import About from '../components/client/About'

class Main extends Component {
  constructor(){
    super()
    this.state = {
      gapi: '',
      signedIn: ''
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route path='/admin' component={Admin}/>
          <Route path='/myaccount' component={MyAccount}/>
          <Route path='/about' component={About}/>
        </Switch>
      </div>
    )}
  }

export default Main;
