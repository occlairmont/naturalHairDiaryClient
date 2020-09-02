import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import {Button} from '@material-ui/core';
import APIURL from '../helpers/environment';

const font = "'Lato', san-serif"
const secFont = "'Frank Ruhl Libre', serif"

const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
    },
    paper: {
    //   textAlign: "center",
      color: theme.palette.text.secondary,
      margin: "10px",
      fontFamily: font,

    },
    title: {
      textAlign:'center',
      color: theme.palette.text.secondary,
      fontFamily: secFont,
      fontWeight: 500,
      marginBottom: '20px'
    },
    button: {
      fontFamily: font,
    },
  }));
  

const CalendarSearch = (props) => {
    const classes = useStyles()
    const [startDate, setStartDate] = useState(new Date('2020-01-01T21:11:54'));
    const [endDate, setEndDate] = useState(new Date('2020-01-01T21:11:54'));

    const handleStartDateChange = (date) => {
        setStartDate(date);
      };

    const handleEndDateChange = (date) => {
        setEndDate(date);
      };
    
    function formatDate(date){
        let convertedDate = new Date(date).toISOString().split("T")[0];
        return convertedDate;
    }

    useEffect(() => {
        console.log(startDate)
    },[startDate])

    const handleSubmit = () => {
        const start = formatDate(startDate);
        const end = formatDate(endDate);
        fetch(`${APIURL}/entry/search-dates`, {
            method: 'POST',
            body: JSON.stringify({
                startDate: start,
                endDate: end,
            }),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization' : props.token,
            }),
        })
        .then((res) => res.json())
        .then((logData) => {
            props.setEntries(logData);
            console.log("from calsearch", logData, props.token);
        });
    };

    return ( 
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="center" >
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Start Date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="End Date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <Button onClick={handleSubmit} className={classes.paper} variant='outlined'>Search</Button>
        </div>
     );
}
 
export default CalendarSearch;