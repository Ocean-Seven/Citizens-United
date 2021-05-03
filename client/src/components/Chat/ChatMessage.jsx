import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { chat, auth } from '../../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ChatMessage = (props) => {
  const { text, uid, displayName, photoURL, createdAt } = props.msg;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL} className="chatPic"></img>
        <p className="chatText">{text}</p>
        <div className="displayname">{displayName}
        <div className="messagetime">{typeof createdAt === "string" ? createdAt : null}</div>
        </div>
      </div>
    </>
  );
}

export default ChatMessage;