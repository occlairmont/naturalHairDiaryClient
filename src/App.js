import React, {useState, useEffect} from 'react';
import './App.css';
// import Navbar from './nav/Navbar';
import User from './user/User';
import EntryLog from './entries/EntryLog';

function App() {
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    } 
  },[]);

  const updateToken = (newToken) =>{
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') ? <EntryLog token={sessionToken}/> : <User updateToken={updateToken}/>)
  }

  return (
    <div >
      {/* <Navbar/> */}
      {protectedViews()}
    </div>
  );
}

export default App;
