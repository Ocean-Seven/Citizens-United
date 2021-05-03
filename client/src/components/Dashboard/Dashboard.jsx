// Libraries + dependencies
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext';
import _, { sortBy } from 'underscore';

// Components
import RequestTile from './RequestTile';
import VolunteerTile from './VolunteerTile';
import Logo from '../Home/Logo';
import TaskModal from './TaskModal';
import OldTasksBtn from './OldTasksBtn';
import Neighborhood from '../Neighborhood';
import DurationFilter from '../DurationFilter';

const Dashboard = ({ user }) => {
  // Gets current signed-in firebase user for displayName and photoURL props
  const { currentUser, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [mongoUser, setMongoUser] = useState();
  const [loaded, setLoaded] = useState(true);
  const [neighborhood, setNeighborhood] = useState({
    neighborhood: '',
  });
  const [selectedDuration, setSelectedDuration] = useState();
  const [filtered, setFiltered] = useState(false);
  const [temp, setTemp] = useState([]);

  // Grabs mongo user on load and re-render & sets state for user & feed
  useEffect(() => getMongoUser(), [loaded]);

  useEffect(() => {
    if (mongoUser && mongoUser.isVolunteer) {
      getVolunteerTasks();
      setSelectedDuration(1000);
    }
  }, [neighborhood]);
  useEffect(()=> {
    if (mongoUser && mongoUser.isVolunteer) {
      durationFilter();
    }
  }, [selectedDuration]);

  // Gets tasks volunteer neighborhood & saves them to state
  const getVolunteerTasks = (mongoUsr) => {
    let params;
    if (neighborhood.neighborhood === "All Neighborhoods") {
      params = {
        firebase_id: currentUser.uid,
      }
    } else {
      params = {
        firebase_id: currentUser.uid,
        task_neighborhood: neighborhood.neighborhood,
      }
    }
    axios.get('/api/tasks/volunteer', { params })
      .then(resp => {
        setTasks(_.sortBy(resp.data[0].tasks, function(obj){
          return new Date (obj.task_date)
        }))
        setTemp(_.sortBy(resp.data[0].tasks, function(obj){
          return new Date (obj.task_date)
        }))
      })
      .catch(err => console.log(err))
      // console.log(temp[0].task_date.substring(0,9))
      // console.log(tasks[0]["task_date"])
  }

  // Get requester user tasks & saves them to state
  const getRequesterTasks = (mongoUsr) => {
    let options = { params: {firebase_id: mongoUsr.firebase_id} };
    axios.get('/api/tasks/requester', options)
      .then(resp => {
        let tasksArr = _.sortBy(resp.data[0].tasks, function(obj){
          return new Date (obj.task_date)
        });

        // Filter expired tasks and mark as expired in DB
        const currentDate = new Date().getTime();
        for (let i = 0; i < tasksArr.length; i++) {
          const endDate = new Date(tasksArr[i].end_time).getTime();
          if (endDate < currentDate) {
            handleExpireTask(tasksArr[i]);
            tasksArr.splice(i, 1);
          }
        }
        setTasks(tasksArr)
      })
      .catch(err => console.log(err))
  }

  // Finds related mongodb user using authorized currentUser uid (firebase_id)
  const getMongoUser = () => {
    let params = { firebase_id: currentUser.uid }
    axios.get('/api/users', { params })
    .then(resp => {
        let mongoUsr = resp.data[0];
        setMongoUser(mongoUsr);
        if (mongoUsr) {
          setNeighborhood({ neighborhood: mongoUsr.neighborhood });
        }
        // Get tasks based on user type
        if (mongoUsr) {
          if (mongoUsr.isVolunteer) {
            getVolunteerTasks(mongoUsr);
          } else {
            getRequesterTasks(mongoUsr);
          }
        }
      })
      .catch(err => console.log(err))
  }

  const durationFilter = () => {
    setFiltered(true);
    setTemp(tasks.filter((object) => {
      return (
        object.duration <= selectedDuration
        )
      })
      )
      // clearState()
  }

  const clearState = () => {
    setSelectedDuration(1000)
  }

  const handleExpireTask = (task) => {
    let params = { task_id: task._id }
    axios.put('/api/tasksexpired', params)
      .then(() => console.log('Task marked expired'))
      .catch(err => console.log(err))
  }

  const handleDeleteTask = (ticket_id) => {
    console.log(ticket_id);
    axios.delete('/api/tasks', { data: { _id: ticket_id }})
    .then(() => {
      console.log('Task deleted');
      setLoaded(prev => !prev)
    })
    .catch((err) => console.error(err))
  }

  return (
    <>
      { !currentUser || !mongoUser ? null : (
        <div id="dashboard-container">
          { /* Header */ }
          <div className="dash-header-container">
            <div id="user-welcome">
              <img
                src={mongoUser.photo}
                style={{ width: '50px', height: '50px', borderRadius: '100%'}}
              />
              <span id="welcome">Welcome, {currentUser.displayName}</span>
              <button id="logout" className="btn btn-secondary" onClick={() => logout()}>
                Log Out
              </button>
            </div>
          </div>

          { /* Change location for volunteer only */
            !mongoUser.isVolunteer
              ? null
              : (
                <>
                <div id="volunteer-neighborhood">
                <i className="fas fa-sync-alt fa-2x refresh-btn-vol" onClick={() => window.location.reload(false)}></i>
                  <Neighborhood
                    fields={neighborhood}
                    setFields={setNeighborhood}
                    showAll={true}
                  />
                  <DurationFilter
                    selectedDuration={selectedDuration}
                    setSelectedDuration={setSelectedDuration}
                    durationFilter={durationFilter}
                  />
                </div>
                <div id="current-neighborhood">Currently Selected: {neighborhood.neighborhood}</div>
                </>
              )
          }

        { /* Add task modal for requesters only */
            mongoUser.isVolunteer
              ? null
              : (
                <div id="volunteer-btns-container">
                  <TaskModal
                    mongoUser={mongoUser}
                    currentUser={currentUser}
                    getRequesterTasks={getRequesterTasks}
                    mongoUser={mongoUser}
                  />
                  <OldTasksBtn />
                  <i className="fas fa-sync-alt fa-2x refresh-btn" onClick={() => window.location.reload(false)}></i>
                </div>
              )
        }

          { /* Tasks / tickets list */ }
          <div id="feed-container">
            { filtered
              ? temp.map(ticket => (
                mongoUser.isVolunteer &&
                <VolunteerTile
                    mongoUser={mongoUser}
                    ticket={ticket}
                    key={ticket._id}
                    volunteerName={currentUser.displayName}
                    setTasks={setTemp}
                    setLoaded={setLoaded}
                  /> ))
              : tasks.map(ticket => (
                mongoUser.isVolunteer
                  ? <VolunteerTile
                      mongoUser={mongoUser}
                      ticket={ticket}
                      key={ticket._id}
                      volunteerName={currentUser.displayName}
                      setTasks={setTasks}
                      setLoaded={setLoaded}
                    />
                  : <RequestTile
                      mongoUser={mongoUser}
                      ticket={ticket}
                      key={ticket._id}
                      setLoaded={setLoaded}
                      handleDeleteTask={handleDeleteTask}
                    />
              ))
            }
          </div>
        </div>
      ) }
  </>
  );
}

export default Dashboard;