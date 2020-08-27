import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {Button} from '@material-ui/core';

const CalendarSearch = (props) => {
    const [startDate, setStartDate] = React.useState(new Date('2020-08-18T21:11:54'));
    // const [endDate, setEndDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
      };

    const handleDateChange = (date) => {
        setStartDate(date);
        handleClose()
      };

    const handleSubmit = (e) => {
        e.prevent.default();
        fetch('https://localhost:3001/entry/search-dates', {
            method: 'GET',
            body: JSON.stringify({
                date: startDate,
                // date: endDate,
            }),
            header: new Headers ({
                'Content-Type': 'application.json',
                'Authorization': props.token,
            })
        })
        .then ((res) => {
            props.fetchEntries()
        });
    };

    return ( 
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="center">
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Start Date"
                    value={startDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}/>
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="End Date"
                    value={startDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}/>
                </Grid>
                <Button onClick={handleSubmit}>Search</Button>
            </MuiPickersUtilsProvider>
        </div>
     );
}
 
export default CalendarSearch;