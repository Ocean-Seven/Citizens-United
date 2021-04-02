import React, { useState, useEffect } from 'react';
import SignUp from './SignUp.jsx';
import { AuthProvider } from '../contexts/AuthContext';


const App = () => {
  return (
    <div id="app-container">
      <AuthProvider>
        Hello world
        <SignUp />
      </AuthProvider>
   </div>
  );
}

export default App;