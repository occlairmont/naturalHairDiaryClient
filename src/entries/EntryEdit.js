import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";
import APIURL from '../helpers/environment';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      // width: '25ch',
    },
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: "10px",
  },
}));

const EntryEdit = (props) => {
  const classes = useStyles();
  const [editDate, setEditDate] = useState(formatDate(props.entryToUpdate.date));
  const [editGoal, setEditGoal] = useState(props.entryToUpdate.goal);
  const [editProducts, setEditProducts] = useState(props.entryToUpdate.products);
  const [editStyle, setEditStyle] = useState(props.entryToUpdate.style);
  const [editIsSuccessful, setEditIsSuccessful] = useState(props.entryToUpdate.isSuccessful.toString());
  const [editNote, setEditNote] = useState(props.entryToUpdate.note);
  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
   props.updateOff(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${APIURL}/entry/update/${props.entryToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify({
        date: editDate,
        goal: editGoal,
        products: editProducts,
        style: editStyle,
        isSuccessful: editIsSuccessful == "Yes" ? true : false,
        note: editNote,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": props.token,
      }),
    })
      .then((res) =>  {
        ;
        // props.editUpdateEntry(entry);
        handleClose();
      });
  };

  function formatDate(dateTime) {
    let date = dateTime.split("T")
    return date[0]
  }

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="wash-day-entry"
        className={classes.root}>
        <DialogTitle id="wash-day-entry" style={{ textAlign: "center" }}>
          Wash Day Entry
        </DialogTitle>
        <DialogContent>
          <TextField
            id="date"
            label="Date"
            variant="outlined"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value.toLocaleString())}
            type="date"
          />
          <TextField
            id="goal"
            label="Goal"
            multiline
            variant="outlined"
            fullWidth
            value={editGoal}
            onChange={(e) => setEditGoal(e.target.value)}
          />
          <TextField
            id="products"
            label="Products Used"
            multiline
            variant="outlined"
            fullWidth
            value={editProducts}
            onChange={(e) => setEditProducts(e.target.value)}
          />
          <TextField
            id="style"
            label="Style"
            multiline
            variant="outlined"
            fullWidth
            value={editStyle}
            onChange={(e) => setEditStyle(e.target.value)}
          />
          <FormLabel component="legend" style={{paddingLeft: '16px', paddingTop: '5px'}}>Did you meet your goal?</FormLabel>
          <RadioGroup
            row
            label="Did you meet your goal?"
            name="goal"
            value={editIsSuccessful}
            onChange={(e) => setEditIsSuccessful(e.target.value)} 
            style={{paddingLeft: '20px'}}>
            <FormControlLabel value="Yes" control={<Radio color="default"/>} label="Yes" />
            <FormControlLabel value="No" control={<Radio color="default"/>} label="No" />
          </RadioGroup>
          <TextField
            id="note"
            label="Notes"
            multiline
            variant="outlined"
            fullWidth
            value={editNote}
            onChange={(e) => setEditNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EntryEdit;
