// Libraries + dependencies
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Components
import AcceptBtn from './AcceptBtn'
import ChatRoom from '../Chat/ChatRoom';

const styles = {
  profile: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  }
}

<<<<<<< HEAD
const VolunteerTile = ({ ticket, setTasks }) => {
=======
const VolunteerTile = ({ ticket, volunteerName }) => {
>>>>>>> dev
  const { currentUser } = useAuth();
  const {
    _id,
    task_date,
    task_status,
    task_body,
    task_neighborhood,
    requestor_id,
    requestor_name,
    requestor_photo,
    start_time,
    end_time,
    room_id
  } = ticket;

  const handleHideTask = () => {
    const body = {
      task_id: _id,
      firebase_id: requestor_id,
    };
    axios.put('/api/tasks/hidden', body)
    .then((res) => {
      setTasks(res.data[0].tasks)
    })
    .catch((err) => console.error(err))
  }

  const reformatDate = (dateStr, time) => {
    const pad = (num) => (
      num.toString().length < 2
        ? ('0' + num)
        : (num)
    )
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = pad(date.getMonth());
    const day = pad(date.getUTCDate());
    const newDateStr = `${year}-${month}-${day}T${time}`;
    return new Date(newDateStr);
  }

  return (
<<<<<<< HEAD

=======
    <Link
      to={{ pathname: `/task/${_id}`, state: { ticket, room_id, isVolunteer: true, volunteerName } }}
      style={{textDecoration: 'none', color: 'black'}}
    >
>>>>>>> dev
      <div className="volunteer-ticket">
        <div className="volunteer-ticket__profile-img">
          <img src={requestor_photo} style={styles.profile} />
        </div>
        <Link
          to={{ pathname: `/task/${_id}`, state: { ticket, room_id, isVolunteer: true } }}
          style={{textDecoration: 'none', color: 'black'}}
        >
        <div className="volunteer-ticket__body">
          <span style={{ display: 'block' }}>
            Requestor: {requestor_name}
          </span>
          <span style={{ display: 'block' }}>
            Request: {task_body}
          </span>
          <span style={{ display: 'block' }}>
            Duration: {Math.round((reformatDate(task_date, end_time) - reformatDate(task_date, start_time))) / 60000} minutes
          </span>
          <span style={{ display: 'block' }}>
            Neighborhood: {task_neighborhood}
          </span>
          <span style={{ display: 'block' }}>
            Request Date/Time: {new Date(task_date).toUTCString()}
          </span>
        </div>
        </Link >

        <div className="volunteer-ticket__buttons">
          <AcceptBtn task_id={_id} />
          <button value="hide" onClick={handleHideTask}>Hide</button>
        </div>
      </div>
  )
}

export default VolunteerTile;