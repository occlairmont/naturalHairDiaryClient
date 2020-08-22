import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActions, CardContent, Button, Typography }from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    //   textAlign: 'left',
      backgroundColor: '#F7F6F3'
    },
    button: {
      flexGrow: 1,
    },
    title: {
      fontSize: 18,
      textAlign: 'left',
    },
    pos: {
      marginBottom: 12,
      textAlign: 'left',
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
    
    //   const entryMap = () => {
    //     return props.entries.map((entries, index) => {
    //       return (
    //         <tr key={index}>
    //           <th scope="row">{workout.id}</th>
    //           <td>{workout.result}</td>
    //           <td>{workout.description}</td>
    //           <td>{workout.definition}</td>
    //           <td>
    //             <Button color="warning" onClick={() => {props.editUpdateWorkout(workout); props.updateOn()}}>Update</Button>
    //             <Button color="danger" onClick={() => {deleteEntry(workout)}}>Delete</Button>
    //           </td>
    //         </tr>
    //       );
    //     });
    //   };
    
    return ( 
        <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          8/19/2020
        </Typography>
        <hr/>
        <Typography variant="h6" className={classes.pos}>
          Today's Goal:
        </Typography>
        <p></p>
        <Typography variant="h6" className={classes.pos}>
          Products Used:
        </Typography>
        <p></p>
        <Typography variant="h6" className={classes.pos}>
          Style Chosen:
        </Typography>
        <p></p>
        <Typography variant="h6" className={classes.pos}>
          Was Your Goal Met?
        </Typography>
        <Typography variant="h6" className={classes.pos}>
          Notes:
        </Typography>
        <p></p>
      </CardContent>
        <hr/>
      <CardActions className={classes.button}>
        <Button size="small" >Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
     );
}
 
export default EntryView;