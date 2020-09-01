import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {AppBar, Toolbar,Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const secFont = "'Shadows Into Light', san-serif"

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  title: {
    flexGrow: 1,
    color:'#ECEBE4',
    fontFamily: secFont,
  },
  color:{
    backgroundColor: '#406464',
  },
  button:{
    color:'#ECEBE4',
  },
});

const Navbar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.color}>
          <Typography variant="h5" className={classes.title}>
            My Natural Hair Journey
          </Typography>
          <Button className={classes.button} component={Link} to="/about">About</Button>
          <Button className={classes.button} component={Link} to="/entries">Entries</Button>
          <Button onClick={props.clickLogout} className={classes.button}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
