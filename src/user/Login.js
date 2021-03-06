import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormGroup, Input, Button } from "@material-ui/core";
import APIURL from '../helpers/environment';

const font = "'Lato', san-serif"
const secFont = "'Frank Ruhl Libre', serif"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  title: {
    fontFamily: secFont,
    fontWeight: 400,
  },
  body:{
    fontFamily: font,
    fontWeight: 400,
  }
}));

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${APIURL}/user/login`, {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.updateToken(data.sessionToken);
      });
  };

  return (
    <form  onSubmit={handleSubmit} className={classes.root}>
        <h1 className={classes.title}>Welcome Back!</h1>
        <h4 className={classes.body}>Login below to continue tracking your natural hair journey.</h4>
        <FormGroup>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            value={email}
            required
            type="email"
          />
        </FormGroup>
        <FormGroup>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            value={password}
            required
            type="password"
          />
        </FormGroup>
        <Button type="submit" variant="outlined">Login</Button>
    </form>
  );
};

export default Login;
