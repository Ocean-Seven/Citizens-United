import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const ConditionalLink = ({ children, to, condition }) => {
  (!!condition && to)
      ? <Link to={to} >{children}</Link>
      : <>{children}</>;
};

const RequestTile = ({ mongoUser, ticket }) => {
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

  const styles = {
    profile: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
    }
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

  // WT: Added conditional so that if room_id exist (AKA task has been accepted), you can click and render the Map + Chat confirmation
  return (
    room_id && requestor_id ? (
      <div>
        <Link
          to={{ pathname: `/task/${_id}`, state: { mongoUser, ticket, room_id, isVolunteer: false } }}
          style={{textDecoration: 'none', color: 'black'}}
        >
          <div className="requestor-ticket">
            <div className="requestor-ticket__profile-img">
              <img src={requestor_photo} style={styles.profile} />
            </div>
            <div className="requestor-ticket__body">
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
            </div>
            <div className="requestor-ticket__buttons">
              <span id="requester-status" className="btn btn-sm" style={{ cursor: "default", backgroundColor: "#8DA5ED" }}>{task_status}</span>
            <button id="chat-btn" style={{ width: "79px", backgroundColor: "#aaf8a7", border: "2px solid #aaf8a7", borderRadius: ".25rem" }}>Chat</button>
            </div>
          </div>
        </Link>
      </div>
    ) : (
      <div className="requestor-ticket">
        <div className="requestor-ticket__profile-img">
          <img src={requestor_photo} style={styles.profile} />
        </div>
        <div className="requestor-ticket__body">
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
        </div>
        <div className="requestor-ticket__buttons">
          <span id="requester-status" className="btn btn-sm" style={{ cursor: "default", backgroundColor: "#FFAF7A" }}>{task_status}</span>
        </div>
      </div>
    )
  );
}

export default RequestTile;