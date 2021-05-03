import React, { useState } from 'react';
import Logo from './Logo';
import LogIn from '../LogIn';
import SignUp from '../SignUp';
import { BrowserRouter as Router, Link, NavLink, Switch, Route, useHistory} from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomePage ({ setIsVolunteer }) {

  return (
    <div id="home">
      <div id="Home-Page">
        <div id="end-links" className="d-flex justify-content-end">
          <div id="Log-In-Button" name="login" >
            <Link to="/login">
            <button type="submit" id="login-button" name="login" className="btn btn-sm" >Log In</button>
            </Link>
          </div>
        </div>
      </div>
        <Card className="banner" id="banner" >
          <img src='story.png' />
        </Card>
        <div>
          <div id="sign-up-bar" className="d-flex justify-content-around">
            <Link to="/signup">
              <button type="submit" id="volunteer-button" className="btn btn-lg" name="volunteer" onClick={() => setIsVolunteer(true)} >
              Sign up to be a volunteer</button>
            </Link>
            <Link to="/signup">
              <button type="submit" id="requester-button" className="btn btn-lg" name="requester" onClick={() => setIsVolunteer(false)}> Sign up to make requests</button>
            </Link>
          </div>
        </div>
        <div className="imgs-banner">
          <img className="home-img" src="pic1.png" />
          <img className="home-img" src="https://image.freepik.com/free-vector/volunteers-helping-elderly-people_23-2148583914.jpg" />
          <img className="home-img" src="https://image.freepik.com/free-vector/volunteers-helping-elderly-people_52683-39216.jpg" />
          <img className="home-img" src="https://image.freepik.com/free-vector/volunteers-helping-older-people_23-2148568868.jpg" />
        </div>
    </div>
  )
}