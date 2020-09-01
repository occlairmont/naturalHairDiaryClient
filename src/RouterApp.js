import React, { useState, useEffect } from 'react';
import './App.css';
import User from './user/User';
import EntryLog from './entries/EntryLog';
import Navbar from './nav/Navbar';
import About from './about/About';
import { Route, Switch } from 'react-router-dom';

const RouterApp = (props) => {
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
        <div>
            {userNavbar()}
        <Switch>
            <Route exact path="/">
            {protectedViews()}
            </Route>
            <Route exact path="/about">
                <About/>
            </Route>
            <Route exact path="/entries">
            {protectedViews()}
            </Route>
        </Switch>
        </div>
     );
}
 
export default RouterApp;