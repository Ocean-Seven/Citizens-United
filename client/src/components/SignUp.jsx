// Libraries + dependencies
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../firebase';
import Login from './LogIn';
import Neighborhood from './Neighborhood'
import { BrowserRouter as Router, Link, NavLink, Switch, Route, useHistory} from 'react-router-dom';

const SignUp = ({ isVolunteer }) => {
  const { signup, currentUser } = useAuth();
  const history = useHistory();
  const [photoUrl, setPhotoUrl] = useState();
  const [progress, setProgress] = useState(0);
  const [fields, setFields] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    neighborhood: ''
  });

  // Tracks user input on form fields
  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    });
  }

  // Handles firebase photo upload, then saves the firebase url for the photo to state for submit to db
  const handlePhoto = (e) => {
    e.preventDefault();
    const task = storage
      .ref(`/photos/${e.target.files[0].name}`)
      .put(e.target.files[0])

    task.on(
      'state_changed',
      snapshot => {
        const transferred = snapshot.bytesTransferred === 0 ?  1 : snapshot.bytesTransferred;
        const progress = Math.round((transferred / snapshot.totalBytes) * 100);
        setProgress(progress)
       },
      error => { console.log(error) },
      () => {
        storage
          .ref('photos')
          .child(e.target.files[0].name)
          .getDownloadURL()
          .then(url => setPhotoUrl(url))
      }
    )
  }

  // Checks for any blank fields & that phone number is 10 digits
  const validateFields = () => {
    Object.keys(fields).map(key => {
      if (fields[key].length === 0) {
        alert(`${key} cannot be blank`);
        throw `${key} cannot be blank`;
      } else if (key === 'phone' && fields[key].length !== 10) {
        alert('Phone number must be 10 digits');
        throw 'Phone number must be 10 digits';
      } else if (progress !== 100) {
        alert('Please wait for picture to upload');
        throw 'Please wait for picture to upload';
      }
    });
  }

  // Submits sign up to firebase & creates new user
  const submitForm = (e) => {
    e.preventDefault();
    let validFields = false;

    // Validates fields & throws error
     Object.keys(fields).map(key => {
      if (fields[key].length === 0) {
        alert(`${key} cannot be blank`);
        return;
      } else if (key === 'phone' && fields[key].length !== 10) {
        alert('Phone number must be 10 digits');
        return;
      }
      return true;
    });

    // Checks if photo has been completely uploaded
    if (progress === 0) {
      validFields = false;
      alert('Please upload a profile picture');
    } else if (progress > 0 && progress < 100) {
      validFields = false;
      alert('Please wait until photo has completely uploaded!');
    } else if (progress === 100) {
      validFields = true;
    }

    // If all fields are valid, give user auth in firebase & create mongo user as well
    if (validFields) {
      signup(fields.email, fields.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: `${fields.firstName} ${fields.lastName}`,
          photoURL: photoUrl,
        });
        let params = {
          firebase_id: res.user.uid,
          first_name: fields.firstName,
          last_name: fields.lastName,
          neighborhood: fields.neighborhood,
          phone_number: fields.phone,
          email: fields.email,
          isVolunteer: isVolunteer,
          thumbsUp: 0,
          thumbsDown: 0,
          photo: photoUrl,
          tasks: [],
        }
        axios.post(`/api/users`, params)
          .then(() => {
            alert(`Account for ${fields.email} created!`);
            history.push('/login');
          })
          .catch(err => alert(`Failed to create Mongo Account for ${fields.email}`))
      })
      .catch(err => alert(err))
    }
  }

  return (
    <div id="signUp-container" name="signup">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4"> Sign Up</h2>
          <Form>
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
              <label>Neighborhood</label>
              <Neighborhood setFields={setFields} fields={fields} showAll={false} />
              <br />
            <label className="form-label" htmlFor="customFile">Upload Profile Picture</label>
            <progress value={progress} max="100" id="uploader"></progress>
            <input type="file" className="form-control" id="customFile" accept="image/*" onChange={handlePhoto} />
              <Button
              id="signup-page-button"
              className="w-100"
              type="submit"
              onClick={submitForm}
            > Sign Up
            </Button>
            <Link
              to={{pathname: `/home`}}
             >
              <Button id="signup-button-back" className="w-100">Back</Button>
            </Link>
            <img src=""></img>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignUp;