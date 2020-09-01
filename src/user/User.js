import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Login from "./Login";
import Signup from "./Signup";
import { Button, Container, CardMedia } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import HairPics from "../assets/closeupgirl2v.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "2em",
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  media: {
    height: "100vh",
  },
}));

const User = (props) => {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(true);
  const title = isLogin ? <Login updateToken={props.updateToken} /> : <Signup updateToken={props.updateToken} />;
  const buttonTitle = isLogin ? "Signup" : "Login";
  const buttonTagLine = isLogin ? "Don't have an account yet?" : "Already have an account?";

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
        <Grid item xs={12} sm={4} md={6}>
          <Paper className={classes.paper} elevation={4}>
            <div>{title}</div>
            <h5>
              {buttonTagLine}
              <Button onClick={(e) => toggle(e)} size="small">
                {buttonTitle}
              </Button>
            </h5>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <CardMedia className={classes.media} image={HairPics} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default User;
