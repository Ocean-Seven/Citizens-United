// Libraries + dependencies
import React, { useState, useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

// Components
import Logo from './Home/Logo.jsx';
import LogIn from './LogIn';
import SignUp from './SignUp';
import HomePage from './Home/HomePage';
import Dashboard from './Dashboard/Dashboard';
import TaskView from './Dashboard/TaskView';
import OldTasksView from './Dashboard/OldTasksView';
import PrivateRoute from './PrivateRoute';
import Map from './Map/Map';

import Rating from './Rating.jsx'

const App = () => {
  const [user, setUser] = useState('');
  const [isVolunteer, setIsVolunteer] = useState();

  return (
    <div>
      <Logo />
      <div id="app-container">
        <AuthProvider>
          <Router >
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/task/:task_id" component={TaskView} user={user} />
              <PrivateRoute exact path="/task/rating/:task_id" component={Rating} user={user}/>
              <PrivateRoute exact path="/oldtasks/:user_id" component={OldTasksView} user={user}/>
              <Route exact path="/home" render={() => <HomePage setIsVolunteer={setIsVolunteer} />} />
              <Route exact path="/signup" render={() => <SignUp isVolunteer={isVolunteer} />} />
              <Route exact path="/login" render={() => <LogIn setUser={setUser} />} />
            </Switch>
          </Router>
        </AuthProvider>
      </div>
    </div>
  )
}

export default App;