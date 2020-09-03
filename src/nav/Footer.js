import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const font = "'Lato', san-serif"

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#487070',
    padding: '3px'
  },
  footer: {
    fontSize: 14,
    fontFamily: font,
    fontWeight: 300,
    color:'#ECEBE4',
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <AppBar position='static' className={classes.appBar}>
      <Typography variant='h6' className={classes.footer}>
      © 2020 My Natural Hair Journey
      </Typography>
    </AppBar>
  );
}

export default Footer;