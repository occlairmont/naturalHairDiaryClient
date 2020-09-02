import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Radio, RadioGroup, FormControlLabel, FormLabel } from "@material-ui/core";
import APIURL from '../helpers/environment';

const font = "'Lato', san-serif"
const secFont = "'Frank Ruhl Libre', serif"

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
    paper: {
        textAlign: "center",
        color: theme.palette.text.secondary,
        margin: '10px',
        fontFamily: font,
      }, 
    button: {
      fontFamily: font,
    },
    title: {
      textAlign:'center',
      color: theme.palette.text.secondary,
      fontFamily: secFont,
      fontWeight: 500,
      marginBottom: '10px'
    }
  }));

const EntryCreate = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [goal, setGoal] = useState("");
  const [products, setProducts] = useState("");
  const [style, setStyle] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [note, setNote] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${APIURL}/entry/new`, {
      method: "POST",
      body: JSON.stringify({
        date: date,
        goal: goal,
        products: products,
        style: style,
        isSuccessful: isSuccessful == "Yes" ? true : false,
        note: note,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": props.token,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        console.log(logData);
        setDate("");
        setGoal("");
        setProducts("");
        setStyle("");
        setIsSuccessful("");
        setNote("");
        props.fetchEntries();
        handleClose()
      });
  };

  function formatDate(dateTime) {
    let date = dateTime.split("T")
    return date[0]
  }

  return (
    <div >
      <h4 className={classes.paper}>Completed a wash day?</h4>
      <Button variant="outlined" onClick={handleClickOpen} className={classes.paper}>
        Create Entry
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="wash-day-entry"
        className={classes.root}>
        <h2 id="wash-day-entry" className={classes.title}>Wash Day Entry</h2>
        <DialogContent>
          <DialogContentText>
             This is to encourage you to keep going in your journey. So enter as much or as little as you need to record your progress. 
          </DialogContentText>
          <TextField
          id="standard-textarea"
          label="Date"
          placeholder="MM/DD/YYYY"
          variant="outlined"
          value={formatDate(date)}
          onChange={(e) => setDate(e.target.value)}
          />
          <TextField
          id="standard-textarea"
          label="Goal"
          placeholder="ex. Shorter detangling time, etc."
          multiline
          variant="outlined"
          fullWidth
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <TextField
          id="standard-textarea"
          label="Products Used"
          placeholder="ex. Eden Bodyworks Shampoo, DIY Deep Conditioner, etc."
          multiline
          variant="outlined"
          fullWidth
          value={products}
          onChange={(e) => setProducts(e.target.value)}
        />
          <TextField
          id="standard-textarea"
          label="Style"
          placeholder="ex. Wash and Go, Twistout, etc."
          multiline
          variant="outlined"
          fullWidth
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
        <FormLabel component="legend" style={{paddingLeft: '16px', paddingTop: '5px'}}>Did you meet your goal?</FormLabel>
        <RadioGroup row label="Did you meet your goal?" name="goal" style={{paddingLeft: '20px'}} value={isSuccessful} onChange={(e) => setIsSuccessful(e.target.value)}>
        <FormControlLabel value="Yes" control={<Radio color="default"/>} label="Yes" />
        <FormControlLabel value="No" control={<Radio color="default"/>} label="No" />
        </RadioGroup>
        <TextField
          id="standard-textarea"
          label="Notes"
          placeholder="ex. What worked, techniques, etc."
          multiline
          variant="outlined"
          fullWidth
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" className={classes.button}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} value="submit" color="default" className={classes.button}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EntryCreate;