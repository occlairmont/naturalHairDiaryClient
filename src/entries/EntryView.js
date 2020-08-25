import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActions, CardContent, Button, Typography, Tooltip }from '@material-ui/core';
import {EditRounded, DeleteRounded } from '@material-ui/icons'

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    //   textAlign: 'left',
      backgroundColor: '#F7F6F3'
    },
    button: {
      width: '100%',
      justifyContent: 'flex-end',
      paddingTop: 0,
      paddingRight: 0,
      paddingLeft: 0,
    },
    title: {
      fontSize: 18,
      textAlign: 'left',
    },
    pos: {
      marginBottom: 10,
      textAlign: 'left',
    },
    respos: {
      textAlign: 'left',
      
    }
  });

const EntryView = (props) => {
    const classes = useStyles();

    const deleteEntry = (entry) => {
        fetch(`http://localhost:3001/entry/delete/${entry.id}`, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": props.token,
          }),
        }).then(() => props.fetchEntries());
      };
    
    //   const entryMap = () => {
    //     return props.entries.map((entries, index) => {
    //       return (
    //         <tr key={index}>
    //           <th scope="row">{workout.id}</th>
    //           <td>{workout.date}</td>
    //           <td>{workout.goal}</td>
    //           <td>{workout.products}</td>
//                   {workout.style}
//                   {workout.isSuccessful}
//                   {workout.note}
    //           <td>
    //             <Button color="warning" onClick={() => {props.editUpdateWorkout(workout); props.updateOn()}}>Update</Button>
    //             <Button color="danger" onClick={() => {deleteEntry(workout)}}>Delete</Button>
    //           </td>
    //         </tr>
    //       );
    //     });
    //   };
    // const entryMap = () => {
    //       return props.entries.map((entries, index) => {
    //         return ( 
    //         );
    //       });
    // };
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
                  <p className={classes.respos}>this is the style</p>
                  <Typography variant="h6" className={classes.pos}>
                    Products Used:
                  </Typography>
                  <p className={classes.respos}>this is the style</p>
                  <Typography variant="h6" className={classes.pos}>
                    Style Chosen:
                  </Typography>
                  <p className={classes.respos}>this is the style</p>
                  <Typography variant="h6" className={classes.pos}>
                    Was Your Goal Met?
                  </Typography>
                  <p className={classes.respos}>this is the style</p>
                  <Typography variant="h6" className={classes.pos}>
                    Notes:
                  </Typography>
                  <p className={classes.respos}>this is the style</p>
                </CardContent>
                  <hr/>
                <CardActions className={classes.button}>
                  <Tooltip title="Edit" arrow><Button size="small"><EditRounded/></Button></Tooltip>
                  <Tooltip title="Delete" arrow><Button size="small"><DeleteRounded/></Button></Tooltip>
                </CardActions>
              </Card>

      // <div>
      //  {entryMap}
      // </div>
     );
}
 
export default EntryView;