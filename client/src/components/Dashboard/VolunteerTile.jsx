// Libraries + dependencies
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _, { sortBy } from 'underscore';
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

const dateOptions = {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
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
    requestor_thumbsUp,
    requestor_thumbsDown,
    volunteer_id,
    start_time,
    end_time,
    room_id,
    duration
  } = ticket;

  const handleHideTask = () => {
    const body = {
      task_id: _id,
      firebase_id: currentUser.uid,
    };
    axios.put('/api/tasks/hidden', body)
    .then((res) => {
      setTasks(_.sortBy(res.data[0].tasks, function(obj){
        return new Date (obj.task_date)
      }))
    })
    .catch((err) => console.error(err))
  }

  return (
      <div className="volunteer-ticket">
        <div className="volunteer-ticket__profile-img">
          <img src={requestor_photo} style={styles.profile} />
        </div>
        <div className="volunteer-ticket__body">
          <span style={{ display: 'block' }}>
            <b>Requester</b>: {requestor_name}
          </span>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <b>Score</b>: &nbsp;
            <i className="far fa-thumbs-up fa-1x"></i> &nbsp;
            <span> { requestor_thumbsUp } </span> &nbsp;&nbsp;&nbsp;
            <i className="far fa-thumbs-down fa-1x"></i> &nbsp;
            <span> { requestor_thumbsDown } </span>
          </span>
          <span style={{ display: 'block' }}>
            <b>Request</b>: {task_body}
          </span>
          <span style={{ display: 'block' }}>
            <b>Duration</b>: {duration} minutes
          </span>
          <span style={{ display: 'block' }}>
            <b>Neighborhood</b>: {task_neighborhood}
          </span>
          <span style={{ display: 'block' }}>
            <b>Request Date/Time</b>: {new Date(start_time).toLocaleString('en-US', dateOptions)}
          </span>
        </div>

        <div className="volunteer-ticket__buttons">
          { task_status === "Accepted" && volunteer_id !== currentUser.uid
              ? null
              : <AcceptBtn mongoUser={mongoUser} ticket={ticket} task_id={_id} setLoaded={setLoaded} />
          }
          {task_status === "Pending" ? <button style={{ width: '79px', backgroundColor: "#8DA5ED", border: "2px solid #8DA5ED", borderRadius: ".25rem" }} value="hide" onClick={handleHideTask}>Hide</button> : null}
        </div>
      </div>
  )
}
export default VolunteerTile;