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
import APIURL from '../helpers/environment';

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
    fetch(`${APIURL}/entry/delete/${entry.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then(() => props.fetchEntries());
  };

  const entryMap = () => {
    console.log(props.entries);
    function formatDate(dateTime) {
      let date = new Date(dateTime)
      return date.toLocaleString().split(",")[0]
    }
    return props.entries.map((entry, index) => {
      return (
        <div>
          <Card className={classes.root} variant="outlined" key={index}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom>
                {formatDate(entry.date)}
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
              <p className={classes.respos}>{entry.isSuccessful.toString()}</p>
              <Typography variant="h6" className={classes.pos}>
                Notes:
              </Typography>
              <p className={classes.respos}>{entry.note}</p>
            </CardContent>
            <hr />
            <CardActions className={classes.button}>
              <Tooltip
                title="Edit"
                arrow>
                <Button size="small"                 
                onClick={() => {
                  props.editUpdateEntry(entry);
                  props.updateOn();
                }}>
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
