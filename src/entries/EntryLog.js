import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid } from "@material-ui/core/";
import EntryView from "./EntryView";
import EntryCreate from './EntryCreate';

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
    paddingTop: '2em',
  },
  paperMod: {
    padding: theme.spacing(1),
    textAlign: "center",
  }
}));

const EntryLog = (props) => {
  const classes = useStyles();
  const [entries, setEntries] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [entryToUpdate, setEntryToUpdate] = useState({});

  const fetchEntries = () => {
    fetch("http://localhost:3001/entry/all", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": props.token,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        setEntries(logData);
        console.log(logData);
      });
  };

const editUpdateEntry = (entry) => {
    setEntryToUpdate(entry);
    console.log(entry);
}

const updateOn = () => {
    setUpdateActive(true);
}

const updateOff = () => {
    setUpdateActive(false);
}

useEffect(() => {
  fetchEntries();
},[])


return (
    <div style={{padding: 20}}>
    <Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paperMod}>
            <EntryCreate fetchEntries={fetchEntries} token={props.token}/>
          </Paper>
          <br/>
          <Paper className={classes.paper}>Calendar</Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}><EntryView /></Paper>
        </Grid>
      </Grid>
    </Grid>
    </div>
  );
};

export default EntryLog;
