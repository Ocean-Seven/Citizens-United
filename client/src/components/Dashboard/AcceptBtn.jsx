// Libraries + dependencies
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.js';
import { chat } from '../../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useHistory, Link } from 'react-router-dom';

const AcceptBtn = ({ mongoUser, ticket, task_id, setLoaded }) => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const chatRoomRef = chat.collection('chatRooms');
  const [roomID, setRoomID] = useState(ticket.room_id);

  // Creates a new chatroom in firebase & returns the roomID
  const createChatRoom = () => {
    chatRoomRef.add({ users: [], message: [] })
      .catch(err => console.log(err))
      .then(resp => setRoomID(resp._delegate._key.path.segments[1]))
  }

  // Adds volunteer id into task in tasks collection
  const putVolunteer = () => {
    axios.put(
      '/api/tasks/accepted',
    { task_id,
      firebase_id: currentUser.uid,
      volunteer_name: currentUser.displayName,
      volunteer_photo: mongoUser.photo,
      volunteer_thumbsUp: mongoUser.thumbsUp,
      volunteer_thumbsDown: mongoUser.thumbsDown,
    })
      .catch(err => console.log(err))
      .then(() => null)
  }

  // Get's task by task id that volunteer was just added to
  const putChatUsers = () => {
    axios.get('/api/oneTask', { params: { task_id }})
      .then(resp => {
        const { requestor_id, volunteer_id, room_id } = resp.data[0];
        // Insert both ids into chatroom by id
        if (!room_id) {
          chatRoomRef.add({
            users: [requestor_id, volunteer_id],
            messages: []
          })
            // .catch(err => console.log(err))
            .then(res => {
              setRoomID(res._delegate._key.path.segments[1])
              axios.put('/api/rooms', { task_id, room_id: res._delegate._key.path.segments[1] })
                // Force dashboard to rerender on click to update info on return
                .then(() => {
                  setLoaded(prev => !prev);
                  history.push(
                    { pathname: `/task/${task_id}`,
                      state: { mongoUser, ticket, room_id: res._delegate._key.path.segments[1], isVolunteer: true }
                    }
                  )
                })
            })
        } else {
          history.push(
            { pathname: `/task/${task_id}`,
              state: { mongoUser, ticket, room_id: roomID, isVolunteer: true }
            })
        }
      })
      .catch(err => console.log(err))
    }

  const handleClick = (e) => {
    putVolunteer();
    putChatUsers();
  }

  return (
    <div  id="accept-btn">
    {/* <Link
      to={{ pathname: `/task/${task_id}`, state: { mongoUser, ticket, room_id: ticket.room_id, isVolunteer: true } }}
      style={{textDecoration: 'none',  color: 'black'}}
      key={Math.random()}
      onClick={handleClick}
    > */}
      <button style={{ background: "none", border: "none" }}>
        { ticket.task_status.toLowerCase() === 'accepted'
          ? <button  onClick={handleClick} id="chat-btn" style={{ width: "79px", backgroundColor: "#aaf8a7", border: "2px solid #aaf8a7", borderRadius: ".25rem" }}>Chat</button>
          : <button  onClick={handleClick} id="acceptBTN" style={{ width: "79px", backgroundColor: "#FFAF7A", border: "2px solid #FFAF7A", borderRadius: ".25rem" }}>Accept</button> }
      </button>
    {/* <button
      onClick={handleClick}
      style={{
        background: "none",
        border: "none",
        width: "67px",
        border: "2px",
        borderRadius: ".25rem",
        backgroundColor: ticket.task_status.toLowerCase === 'accepted' ? '#aaf8a7' : '#FFAF7A'
      }}
    >
      { ticket.task_status.toLowerCase === 'accepted' ? 'Chat' : 'Accept' }
    </button> */}
    {/* </Link> */}
    </div>

  );
}

export default AcceptBtn;