// Libraries + dependencies
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext.js';
import Login from './LogIn';

const SignUp = () => {
  const { signup, currentUser } = useAuth();
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    neighborhood: '',
    email: '',
    password: '',
    type: '',
    photoURL: '',
  });
  const [currentPage, setCurrentPage] = useState('signup')
  // const [type, setType] = useState('default')

  const changePage = (e) => {
    setCurrentPage(e.target.name)
  }

  // Tracks user input on form fields
  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    });
  }

  // Submits sign up to firebase & creates new user
  const submitForm = (e) => {
    e.preventDefault();
    signup(fields.email, fields.password)
      .catch(err => console.log(err))
      .then((res) => {
        res.user.updateProfile({
          displayName: `${fields.firstName} ${fields.lastName}` ,
          photoURL: fields.photoURL,
        })
        let params = {
          firebase_id: res.user.uid,
          first_name: fields.firstName,
          last_name: fields.lastName,
          neighborhood: fields.neighborhood,
          phone_number: fields.phone,
          email: fields.email,
          isVolunteer: true,
          thumbsUp: 0,
          thumbsDown: 0,
          photo: 'www.photo.com',
          tasks: [],
        }
        axios.post(`/api/users`, params)
          .catch(err => alert(`Failed to create Mongo Account for ${fields.email}`))
          .then(() => alert(`Account for ${fields.email} created!`))
      })
  }

  if(currentPage === 'signup') {
    return (
      <div id="signUp-container" name="signup">
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4"> Sign Up</h2>
            <Form>
              <Form.Group id="signUpFirstName">
                <Form.Label> First Name </Form.Label>
                <Form.Control
                  name="firstName"
                  type="firstName"
                  value={fields.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group id="signUpLastName">
                <Form.Label> Last Name </Form.Label>
                <Form.Control
                  name="lastName"
                  type="lastName"
                  value={fields.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group id="signUpPhone">
                <Form.Label> Phone Number </Form.Label>
                <Form.Control
                  name="phone"
                  type="phone"
                  value={fields.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group id="signUpNeighborhood">
                <Form.Label> Neighborhood </Form.Label>
                <Form.Control
                  name="neighborhood"
                  type="neighborhood"
                  value={fields.neighborhood}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group id="signUpEmail">
                <Form.Label> Email </Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={fields.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group id="signUpPassword">
                <Form.Label> Password </Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  value={fields.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <div id="radio-buttons">
              <Form.Group id="volunteer-radio" >
                <Form.Label> Volunteer </Form.Label>
                <Form.Control
                  name="type"
                  type="radio"
                  value="volunteer"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group id="requester-radio" >
                <Form.Label> Requester </Form.Label>
                <Form.Control
                  name="type"
                  type="radio"
                  value="requester"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              </div>
              <Button
                id="signup-button"
                className="w-100"
                type="submit"
                onClick={submitForm}
              > Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2" >
          Already have an account? <a href="#" class="link" name="login" onClick={changePage}>Log In</a>
        </div>
      </div>
    )
  } else if (currentPage === 'login') {
    return (
      <Login />
    )
  }
}

export default SignUp;