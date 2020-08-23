import React, {useState, useEffect} from 'react';
import './App.css';
import User from './user/User';
import EntryLog from './entries/EntryLog';
import Navbar from './nav/Navbar';
import {BrowserRouter as Router} from 'react-router-dom';


function App() {
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    } 
    document.title='Natural Hair Journey'
  },[]);

  const updateToken = (newToken) =>{
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const clearToken = () => {
        localStorage.clear();
        setSessionToken('');
      }

  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') ? <EntryLog token={sessionToken}  />  : <User updateToken={updateToken}/>)
  }

  const userNavbar = () =>{
    return (sessionToken === localStorage.getItem('token') ? <Navbar clickLogout={clearToken}/> : <></>)
  }

  return (
    <div >
      <Router>
      {userNavbar()}
      {protectedViews()}
      </Router>
    </div>
  );
}

export default App;
