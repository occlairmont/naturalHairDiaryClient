import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid, CardMedia }from '@material-ui/core';
import Pics from '../assets/girlintwists.jpg';

const font = "'Lato', san-serif"
const secFont = "'Frank Ruhl Libre', serif"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  content: {
    padding: theme.spacing(2),
    textAlign: 'left',
    fontFamily: font,
  },
  media: {
      height: '100vh'
  },
  title: {
    fontFamily: secFont,
    marginTop: '6px'
  }
}));

const About = () => {
    const classes = useStyles();
    return ( 
      <div style={{padding: 20}} >
        <Grid container spacing={2} direction="row" justify="center" alignItems="center">
          <Grid item xs={12} sm={6} md={5}>
            <CardMedia 
              className={classes.media}
              component="img" image={Pics}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            <Paper className={classes.content} >
            <h2 className={classes.title}>The Start of Your Natural Hair Journey.</h2>
                <span>Going natural can seem like such a daunting adventure especially when a lot of us haven't dealt with or even see our own hair most, if not all, our lives. However, for those who are willing to allow that part of us to be free, there is potential for it flourish. </span>
                <br/>
                <br/>
                <span>This site is your personal hair diary. It is a tool that will help you track the details such as what products works well for your hair or which styles works best for your lifestyle. So it's no longer a guessing game which saves you time and money. My hope is to make it easier for you learn and love your natural hair whether you're newly natural or seasoned veteran trying to adjust to life's changes.</span>
                <br/>
                <br/>
                <span>So when you're ready, go create your wash day entry and look forward to the adventure in discovering the beauty in what's naturally yours!</span>
                </Paper>
          </Grid>
        </Grid>
      </div>
     );
}
 
export default About;