import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid, CardMedia }from '@material-ui/core';
import Pics from '../assets/girlintwists.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  content: {
    padding: theme.spacing(2),
    textAlign: 'left',
  },
  media: {
      height: '80vh'
  }
}));

const About = () => {
    const classes = useStyles();
    return ( 
      <div style={{padding: 20}} >
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12} sm={6} md={5}>
            <CardMedia 
              className={classes.media}
              component="img" image={Pics}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            <Paper className={classes.content}>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span>
                </Paper>
          </Grid>
        </Grid>
      </div>
     );
}
 
export default About;