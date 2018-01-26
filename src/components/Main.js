import React, { Component }  from 'react';
import { Switch, Route } from 'react-router-dom'
import Homepage from '../components/Homepage'
import Admin from '../components/admin/Admin'
import MyAccount from '../components/client/MyAccount'
import About from '../components/client/About'
import Login from '../components/client/Login'
import Register from '../components/client/Register'

class Main extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route path='/admin' component={Admin}/>
          <Route path='/myaccount' component={MyAccount}/>
          <Route path='/about' component={About}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
        </Switch>
      </div>
    )}
  }

export default Main;
