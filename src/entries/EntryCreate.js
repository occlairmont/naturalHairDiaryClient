import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Radio, RadioGroup, FormControlLabel, FormLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        // width: '25ch',
      },
    },
    paper: {
        textAlign: "center",
        color: theme.palette.text.secondary,
        margin: '10px',
      },    
  }));

const EntryCreate = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [goal, setGoal] = useState("");
  const [products, setProducts] = useState("");
  const [style, setStyle] = useState("");
  const [isSuccessful, setIsSuccessful] = useState("No");
  const [note, setNote] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/entry/new", {
      method: "POST",
      body: JSON.stringify({
        date: date,
        goal: goal,
        products: products,
        style: style,
        isSuccessful: isSuccessful,
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
        // not sure what to put for isSuccessful since it's a boolean
        setIsSuccessful("");
        setNote("");
        props.fetchEntries();
        handleClose()
      });
  };

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
        <DialogTitle id="wash-day-entry" style={{textAlign: "center"}}>Wash Day Entry</DialogTitle>
        <DialogContent>
          <DialogContentText>
             This is to encourage you to keep going in your journey. So enter as much or as little as you need to record your progress. 
          </DialogContentText>
          <TextField
          id="standard-textarea"
          label="Date"
          placeholder="ex. 8/10/2020"
          variant="outlined"
          value={date}
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
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} value="submit" color="primary" >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EntryCreate;