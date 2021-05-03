import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from '../../contexts/AuthContext';
import EditTaskModal from './EditTaskModal';

const RequestTile = ({ mongoUser, ticket, old, setRenderOld, handleDeleteTask }) => {
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
    room_id,
    duration
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

  const dateOptions = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }

  // WT: Added conditional so that if room_id exist (AKA task has been accepted), you can click and render the Map + Chat confirmation
  return (
    room_id && requestor_id ? (
      <div>
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
              <b>Duration</b>: {duration} minutes
            </span>
            <span style={{ display: 'block' }}>
              <b>Neighborhood</b>: {task_neighborhood}
            </span>
            <span style={{ display: 'block' }}>
              <b>Request Date/Time</b>: {new Date(start_time).toLocaleString('en-US', dateOptions)}
            </span>
          </div>
          <div className="requestor-ticket__buttons">
            <span
              id="requester-status"
              className="btn btn-sm"
              style={{  cursor: "default", width: "85px", backgroundColor: "#8DA5ED" }}
            >
              {task_status}
            </span>
            { /* Dynamic button rendering, chat if regular tile, edit if old task */ }
            { old
              ?
              (
                <EditTaskModal ticket={ticket} setRenderOld={setRenderOld} />
              )
              :
              (
                <Link
                  key={Math.random()}
                  to={{ pathname: `/task/${_id}`, state: { mongoUser, ticket, room_id, isVolunteer: false } }}
                  style={{textDecoration: 'none', color: 'black'}}
                >
                  <button id="chat-btn" style={{ width: "85px", backgroundColor: "#aaf8a7", border: "2px solid #aaf8a7", borderRadius: ".25rem" }}>Chat</button>
                </Link>
              )
            }

          </div>
        </div>
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
            <b>Duration</b>: {duration} minutes
          </span>
          <span style={{ display: 'block' }}>
            <b>Neighborhood</b>: {task_neighborhood}
          </span>
          <span style={{ display: 'block' }}>
            <b>Request Date/Time</b>: {new Date(start_time).toLocaleString('en-US', dateOptions)}
          </span>
        </div>
        <div className="requestor-ticket__buttons">
          <span id="requester-status" className="btn btn-sm" style={{ cursor: "default", width: "85px", backgroundColor: "#FFAF7A"}}>{task_status}</span>
          <span
              id="requester-taskdelete"
              className="btn btn-sm"
              style={{ width: "85px", height: "31px", backgroundColor: "#FFCCCB" }}
              onClick={() => handleDeleteTask(_id)}
            >
              Delete
          </span>
          { old &&
            <EditTaskModal ticket={ticket} setRenderOld={setRenderOld} />
          }
        </div>
      </div>
    )
  );
}

export default RequestTile;