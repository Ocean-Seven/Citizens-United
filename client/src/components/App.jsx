import React, { useState, useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import LogIn from './LogIn';
import SignUp from './SignUp';
import HomePage from './Home/HomePage';
import TileList from './TileList.jsx';

const App = () => {

  return (
    <div id="app-container">
      <AuthProvider>
        <HomePage />
        <LogIn />
        <SignUp />
        <TileList />
      </AuthProvider>
   </div>
  );
}

export default App;