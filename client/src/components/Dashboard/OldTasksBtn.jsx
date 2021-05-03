// Libraries + dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

const OldTasksBtn = () => {
  const { currentUser } = useAuth();

  return (
    <Link
      to={{ pathname: `/oldtasks/${currentUser.uid}` }}
      style={{textDecoration: 'none', color: 'black'}}
      id="old-tasks-btn-container"
    >
      <button id="old-tasks-btn" type="button" className="btn btn-secondary">VIEW OLD TASKS</button>
    </Link>
  );
}

export default OldTasksBtn;