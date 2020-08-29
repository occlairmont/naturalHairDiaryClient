import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import {Button} from '@material-ui/core';
import APIURL from '../helpers/environment';

const CalendarSearch = (props) => {
    const [startDate, setStartDate] = useState(new Date('2020-06-18T21:11:54'));
    const [endDate, setEndDate] = useState(new Date('2020-08-29T21:11:54'));
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
      };

    const handleStartDateChange = (date) => {
        setStartDate(date);
      };

    const handleEndDateChange = (date) => {
        setEndDate(date);
      };
    
    function formatDate(date){
        let convertedDate = new Date(date).toISOString().split("T")[0]
        // 1996-10-15T00:05:32.000Z
        // [1996-10-15, 00:05:32.000Z]
        // 1996-10-15
        let day = convertedDate.split("-")[2]
        // [1996, 10, 15]
        let month = convertedDate.split("-")[1]
        let year = convertedDate.split("-")[0]
        return `${month}/${day}/${year}`
    }

    useEffect(() => {
        console.log(startDate)
    },[startDate])
 //  const dateRange = (start, end) => {  
//      
//       
//      
// 
//       
//  }

    const handleSubmit = () => {
        const start = formatDate(startDate)
        const end = formatDate(endDate)
        fetch(`${APIURL}/entry/search-dates`, {
            method: 'POST',
            body: JSON.stringify({
                startDate: start.toString(),
                endDate: end.toString(),
            }),
            headers: new Headers ({
                'Content-Type': 'application.json',
                'Authorization': props.token,
            })
        })
        .then((res) => res.json())
        .then((logData) => {
            // props.setEntries(logData);
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
            <Button onClick={handleSubmit}>Search</Button>
        </div>
     );
}
 
export default CalendarSearch;