import React, { Component }  from 'react';
import { Switch, Route } from 'react-router-dom'
import Homepage from '../components/Homepage'
import Admin from '../components/Admin'
import MyAccount from '../components/MyAccount'

class Main extends Component {
  constructor(){
    super()
    this.state = {
      gapi: '',
      signedIn: ''
    }
  }

  thisState(something){
    console.log('hi')
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route path='/admin' component={Admin}/>
          <Route path='/myaccount' component={MyAccount}/>
        </Switch>
      </div>
    )}
  }

export default Main;
