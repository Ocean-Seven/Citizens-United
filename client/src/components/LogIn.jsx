// Libraries + dependencies
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext.js';
import { useHistory, Link } from 'react-router-dom';
import Logo from './Home/Logo.jsx';

const LogIn = ({ setUser }) => {
  const { login, currentUser } = useAuth();
  const history = useHistory();
  const [fields, setFields] = useState({
    email: '',
    password: ''
  });

  // Tracks user input on form fields
  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    });
  }

  // Sends login request to firebase
  const handleClick = (e) => {
    e.preventDefault();
    login(fields.email, fields.password)
      .then((res) => {
        axios.get('/api/users', { params: { firebase_id: res.user.uid }})
        .then((resp) => {
          setUser(resp.data[0]);
          history.push('/');
        })
        .catch(err => console.log(err))
      })
      .catch((err) => alert(err))
  }

  return (
    <div id="login-container">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control  name="email" type="email" value={fields.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" value={fields.password} onChange={handleChange} required />
            </Form.Group>
            <Button id="login-page-button" className="w-100" onClick={handleClick}>Log In</Button>
            <Link to={{ pathname: '/home'}}>
              <Button id="login-button-back" className="w-100"> Back </Button>
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default LogIn;