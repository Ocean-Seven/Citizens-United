// Libraries + dependencies
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Form, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Components
import RequestTile from './RequestTile';

const OldTasksView = () => {
  const { currentUser } = useAuth();
  const [oldTasks, setOldTasks] = useState();
  const [renderOld, setRenderOld] = useState(false);

  // Retrieves users completed tasks from database
  useEffect(() => {
    let params = { requestor_id: currentUser.uid }
    axios.get('/api/oldtasks', { params })
      .then(resp => {
        setOldTasks(resp.data);
        console.log(resp.data);
      })
      .catch(err => console.log(err))

  }, [renderOld]);

  const handleDeleteTask = (ticket_id) => {
    axios.delete('/api/tasks', { data: { _id: ticket_id }})
    .then(() => {
      console.log('Task deleted');
      setRenderOld(prev => !prev)
    })
    .catch((err) => console.error(err))
  }

  return (
    <div id="dashboard-container">
      <div className="dash-header-container">
        <div id="user-welcome">
          <img
            src={currentUser.photoURL}
            style={{ width: '50px', height: '50px', borderRadius: '100%'}}
          />
          <span id="welcome">Welcome {currentUser.displayName}</span>
          <Link to={{ pathname: "/"}}>
          <button id="logout" className="btn btn-secondary">Go Back To Home</button>
          </Link>
          </div>
        </div>
        <div className="old-tasks">
        { !oldTasks ? null : (
          oldTasks.map(ticket => <RequestTile ticket={ticket} old={true} setRenderOld={setRenderOld} handleDeleteTask={handleDeleteTask} />)
        )}
      </div>
    </div>
  );
};

export default OldTasksView;