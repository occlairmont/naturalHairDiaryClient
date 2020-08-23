import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Button } from "@material-ui/core/";
import EntryView from "./EntryView";
import EntryCreate from './EntryCreate';
import {Route, Switch} from "react-router-dom";
import About from "../about/About";

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
  const [entriesToUpdate, setEntriesToUpdate] = useState({});

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
    setEntriesToUpdate(entry);
    console.log(entry);
}

const updateOn = () => {
    setUpdateActive(true);
}

const updateOff = () => {
    setUpdateActive(false);
}

return (
    <div style={{padding: 20}}>
    <Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paperMod}>
            <EntryCreate/>
          </Paper>
          <br/>
          <Paper className={classes.paper}>Calendar</Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}><EntryView/></Paper>
        </Grid>
      </Grid>
    </Grid>
    <Switch>
        <Route exact path="/about"><About/></Route>
    </Switch>
    </div>
  );
};

export default EntryLog;
