import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Homepage from '../components/Homepage'
import Admin from '../components/Admin'
import MyAccount from '../components/MyAccount'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Homepage}/>
      <Route path='/admin' component={Admin}/>
      <Route path='/myaccount' component={MyAccount}/>
    </Switch>
  </main>
)

export default Main;
