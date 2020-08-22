import React, {useState, useEffect} from 'react';
import './App.css';
// import Navbar from './nav/Navbar';
import User from './user/User';
import EntryLog from './entries/EntryLog';
import Navbar from './nav/Navbar';

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
      {userNavbar()}
      {protectedViews()}
    </div>
  );
}

export default App;
