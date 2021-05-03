// Libraries + dependencies
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { chat, auth } from '../../firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import moment from  'moment';
// Components
import ChatMessage from './ChatMessage.jsx'

// Custom hook wrapper for document data to avoid null errors
function useDocumentDataSSR(ref, options) {
  const [value, loading, error] = useDocumentData(ref, options)
  if (options?.startWith && loading) {
    return [options.startWith, loading, error]
  } else {
    return [value, loading, error]
  }
}
const ChatRoom = ({ room_id, mongoUser }) => {
  const dummy = useRef();
  const { currentUser } = useAuth();
  const roomRef = chat.doc(`chatRooms/${room_id}`);
  const [msgStream] = useDocumentDataSSR(roomRef, { startWith: 'messages' })
  const [newMsg, setNewMsg] = useState('');

  // Sends message to chatroom and updates firebase db
  const sendMessage = (e) => {
    e.preventDefault();
    let msg = {
      text: newMsg,
      createdAt: moment().format('LT'),
      uid: currentUser.uid,
      displayName: currentUser.displayName,
      photoURL: mongoUser.photo
    }

    roomRef.update({ messages: msgStream.messages.concat([msg]) })
    setNewMsg('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <div className="chat-container">
      <div className="main">
      <div className="chat-header">Start chatting below!</div>
        {!msgStream?.messages ? null : (
          msgStream?.messages.map(msg => <ChatMessage msg={msg} key={msg.uid + msg.text} />)
        )}
      <div ref={dummy}></div>
      </div>
      <form className="chatForm" onSubmit={sendMessage}>
        <input className="input" value={newMsg} onChange={(e) => setNewMsg(e.target.value)} placeholder="Message"/>
        <button className="chatBtn" type="submit"> Send Message</button>
      </form>
    </div>
  )
}

export default ChatRoom;