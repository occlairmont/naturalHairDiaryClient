import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {AppBar, Toolbar,Typography, Button } from "@material-ui/core";
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  title: {
    flexGrow: 1
  },
  color:{
    backgroundColor: '#588989',
    // color: '#1C1C1C'
  },
});

const Navbar = (props) => {
  const classes = useStyles();

//   const handleSubmit = (event) => {
//     event.preventDefault();
    
//  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.color}>
          <Typography variant="h6" className={classes.title}>
            My Natural Hair Journey
          </Typography>
          <Button onClick={props.clickLogout} color="#1C1C1C" >Log Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
