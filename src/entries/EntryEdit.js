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
  const [editDate, setEditDate] = useState("");
  const [editGoal, setEditGoal] = useState("");
  const [editProducts, setEditProducts] = useState("");
  const [editStyle, setEditStyle] = useState("");
  const [editIsSuccessful, setEditIsSuccessful] = useState("No");
  const [editNote, setEditNote] = useState("");
  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
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
        isSuccessful: editIsSuccessful,
        note: editNote,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": props.token,
      }),
    })
      .then((res) =>  {
        props.fetchEntries();
        props.updateoff();
        handleClose();
      });
  };

  return (
    <div>
      <Dialog
        open={open}
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
            onChange={(e) => setEditDate(e.target.value)}
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
          <FormLabel component="legend">Did you meet your goal?</FormLabel>
          <RadioGroup
            row
            label="Did you meet your goal?"
            name="goal"
            value={editIsSuccessful}
            onChange={(e) => setEditIsSuccessful(e.target.value)}>
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
