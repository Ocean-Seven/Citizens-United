// Libraries + dependencies
import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const Rating = (props) => {
  const history = useHistory();
  const { ticket, isVolunteer } = props.location.state
  const partnerID = !isVolunteer ? ticket.volunteer_id : ticket.requestor_id;

  // Marks task complete in database
  const markTaskComplete = () => {
    let params = { task_id: ticket._id }
    axios.put('/api/tasks/completed', params)
      .catch(err => console.log(err))
  }

  const thumbsUp = () => {
    axios.put('/api/ratings/thumbsUp', { firebase_id: partnerID })
      .catch((err) => (console.log(err)))
      .then(() => (alert('Vote Submitted')))
      .then(() => markTaskComplete())
      .then(() => history.push('/'))
  }

  const thumbsDown = () => {
    axios.put('/api/ratings/thumbsDown', {firebase_id: partnerID })
      .catch((err) => (console.log(err)))
      .then(() => (alert('Vote Submitted')))
      .then(() => markTaskComplete())
      .then(() => history.push('/'))
  }

  return (
    <div id="vote-container">
      <div id="vote-title">
        <h2>Please Rate Your {isVolunteer ? 'Requester' : 'Volunteer'}</h2>
      </div>
      <div id="thumbs-up">
        <h4 id="thumbs-up-header" >Thumbs Up!</h4>
        <div id="thumbsup-logo">
        <i onClick={thumbsUp} className="far fa-thumbs-up fa-10x"></i>
        </div>
        <div id="paragraph1">
          {props.user.isVolunteer ? <p>Your requester was polite and appreciative and you would love to volunteer for them again.</p> : <p>Your volunteer was helpful and polite and you would love to have them as your volunteer again.</p>}
        </div>
      </div>
      <div id="thumbs-down">
        <h4 id="thumbs-down-header">Thumbs Down!</h4>
        <div id="thumbsdown-logo">
        <i onClick={thumbsDown} className="far fa-thumbs-down fa-10x"></i>
        </div>
        <div id="paragraph2">
          {props.user.isVolunteer ? <p>Your requester was not polite and you wish to not volunteer for them again.</p> : <p>Your volunteer was not helpful and you wish to not have them as your volunteer again.</p>}
        </div>
      </div>
    </div>
  )
}

export default Rating