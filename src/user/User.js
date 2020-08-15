import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Login from "./Login";
import Signup from "./Signup";
import { Button, Container, CardMedia } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Balconygirl from "../assets/balconygirl.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#EEF0F2',
    height: '100vh',
    padding: '2em',
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  media: {
      height: '90vh',
  }
}));

const User = (props) => {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(true);
  const title = isLogin ? <Login updateToken={props.updateToken} /> : <Signup updateToken={props.updateToken} />;

  function toggle(e) {
    e.preventDefault();
    if (isLogin == true) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }
  return (
    <Container className={classes.root}>
      <Grid container spacing={2} direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <div>{title}</div>
            <h5>
              Don't have an account yet?{" "}
              <Button onClick={(e) => toggle(e)} size="small">Signup</Button>
            </h5>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
            <CardMedia className={classes.media} image={Balconygirl}/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default User;
