import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormGroup, Input, Button, Dialog, DialogContentText } from "@material-ui/core";
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
    fontSize: 15,
  }
}));

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password.length < 5){
      alert("Password must be at least 5 characters!")
      return 
    }

    fetch(`${APIURL}/user/signup`, {
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
    <form onSubmit={handleSubmit} className={classes.root}>
      <h1 className={classes.title}>Welcome!</h1>
      <h5 className={classes.body}>Ready to take the next step in accepting yourself?
          <br/>
          Signup below to begin your journey to loving your beautiful, natural hair.
      </h5>
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
          required
          type="password"
          value={password}
          />
      </FormGroup>
      <Button type="submit" variant="outlined">Signup</Button>
    </form>
  );
};

export default Signup;
