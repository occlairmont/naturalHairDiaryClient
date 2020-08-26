import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { EditRounded, DeleteRounded } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: "#F7F6F3",
  },
  button: {
    width: "100%",
    justifyContent: "flex-end",
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
  title: {
    fontSize: 18,
    textAlign: "left",
  },
  pos: {
    marginBottom: 10,
    textAlign: "left",
  },
  respos: {
    textAlign: "left",
  },
});

const EntryView = (props) => {
  const classes = useStyles();

  const deleteEntry = (entry) => {
    fetch(`http://localhost:3001/entry/delete/${entry.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then(() => props.fetchEntries());
  };

  const entryMap = () => {
    console.log(props.entries);
    return props.entries.map((entry, index) => {
      return (
        <div>
          <Card className={classes.root} variant="outlined" key={index}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom>
                {entry.date}
              </Typography>
              <hr />
              <Typography variant="h6" className={classes.pos}>
                Today's Goal:
              </Typography>
              <p className={classes.respos}>{entry.goal}</p>
              <Typography variant="h6" className={classes.pos}>
                Products Used:
              </Typography>
              <p className={classes.respos}>{entry.products}</p>
              <Typography variant="h6" className={classes.pos}>
                Style Chosen:
              </Typography>
              <p className={classes.respos}>{entry.style}</p>
              <Typography variant="h6" className={classes.pos}>
                Was Your Goal Met?
              </Typography>
              <p className={classes.respos}>{entry.isSuccessful}</p>
              <Typography variant="h6" className={classes.pos}>
                Notes:
              </Typography>
              <p className={classes.respos}>{entry.note}</p>
            </CardContent>
            <hr />
            <CardActions className={classes.button}>
              <Tooltip
                title="Edit"
                arrow
                onClick={() => {
                  props.editUpdateEntry(entry);
                  props.updateOn();
                }}>
                <Button size="small">
                  <EditRounded />
                </Button>
              </Tooltip>
              <Tooltip
                title="Delete"
                arrow
                onClick={() => {deleteEntry(entry);}}>
                <Button size="small">
                  <DeleteRounded />
                </Button>
              </Tooltip>
            </CardActions>
          </Card>
          <br />
        </div>
      );
    });
  };

  return (
    <div>
      {entryMap()}
    </div>
    );
};

export default EntryView;
