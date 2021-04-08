// Libraries + dependencies
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Components
import AcceptBtn from './AcceptBtn'

const styles = {
  profile: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  }
}

const VolunteerTile = ({ mongoUser, ticket, volunteerName, setTasks, setLoaded }) => {
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
    volunteer_id,
    start_time,
    end_time,
    room_id
  } = ticket;

  const handleHideTask = () => {
    const body = {
      task_id: _id,
      firebase_id: currentUser.uid,
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

  console.log(ticket)
  return (
      <div className="volunteer-ticket">
        <div className="volunteer-ticket__profile-img">
          <img src={requestor_photo} style={styles.profile} />
        </div>
        <div className="volunteer-ticket__body">
          <span style={{ display: 'block' }}>
            <b>Requester</b>: {requestor_name}
          </span>
          <span style={{ display: 'block' }}>
            <b>Request</b>: {task_body}
          </span>
          <span style={{ display: 'block' }}>
            <b>Duration</b>: {Math.round((reformatDate(task_date, end_time) - reformatDate(task_date, start_time))) / 60000} minutes
          </span>
          <span style={{ display: 'block' }}>
            <b>Neighborhood</b>: {task_neighborhood}
          </span>
          <span style={{ display: 'block' }}>
            <b>Request Date/Time</b>: {new Date(task_date).toUTCString()}
          </span>
          <span style={{ display: 'block' }}>
            <b>Requester Rating</b>: {}
          </span>
        </div>

        <div className="volunteer-ticket__buttons">
          { task_status === "Accepted" && volunteer_id !== currentUser.uid
              ? null
              : <AcceptBtn mongoUser={mongoUser} ticket={ticket} task_id={_id} setLoaded={setLoaded} />
          }
          {task_status === "Pending" ? <button style={{width: '67px', backgroundColor: "#8DA5ED", border: "2px solid #8DA5ED", borderRadius: ".25rem" }} value="hide" onClick={handleHideTask}>Hide</button> : null}
        </div>
      </div>
  )
}
export default VolunteerTile;