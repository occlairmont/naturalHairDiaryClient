import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {AppBar, Toolbar,Typography, Button } from "@material-ui/core";
import {Route, Link, Switch } from "react-router-dom";
import About from "../about/About";
import EntryLog from "../entries/EntryLog";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  title: {
    flexGrow: 1
  },
  color:{
    backgroundColor: '#406464',
  },
  button:{
    color:'#ECEBE4',
  }
});

const Navbar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.color}>
          <Typography variant="h6" className={classes.title}>
            My Natural Hair Journey
          </Typography>
          <Button className={classes.button} component={Link} to="/about">About</Button>
          <Button onClick={props.clickLogout} className={classes.button}>Logout</Button>
        </Toolbar>
      </AppBar>
      {/* <div>
          <Switch>
              <Route exact path="/about"><About/></Route>
              <Route exact path="/entries"><EntryLog/></Route>
          </Switch>
      </div> */}
    </div>
  );
};

export default Navbar;
