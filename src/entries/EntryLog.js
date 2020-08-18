import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid } from "@material-ui/core/";
import Navbar from "../nav/Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  grid: {
      padding: '2em',
  }
}));

const EntryLog = (props) => {
  const classes = useStyles();
  const [entries, setEntries] = useState([]);

  const fetchEntries = () => {
    fetch("http://localhost:3001/entry/all", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        setEntries(logData);
        console.log(logData);
      });
  };

  return (
      <div className={classes.root}>
      <Navbar />
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default EntryLog;
