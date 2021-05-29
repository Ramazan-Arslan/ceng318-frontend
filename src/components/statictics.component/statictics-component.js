import React, { useState, useEffect } from 'react'
import './statictics-component.css'
import TextField from '@material-ui/core/TextField'
import { Multiselect } from 'multiselect-react-dropdown'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import 'date-fns'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers'
import helpers from './statictics-component-helper'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}))


export default function Statictics(props) {
    const classes = useStyles()
    const [selectedDentist, setSelectedDentist] = useState([]);
    const [selectedTreatment, setSelectedTreatment] = useState([]);
    const [selectedDateBegin, setSelectedDateBegin] = useState(null)
    const [selectedDateEnd, setSelectedDateEnd] = useState(null)
    const [appointmentCount, setAppointmentCount] = useState(0)
    const [totalGain, setTotalGain] = useState(0)
    const [workLoad, setWorkLoad] = useState(0.0)

    const handleStartDateChange = (date) => {
        var startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        setSelectedDateBegin(startDate)
    }

    const handleEndDateChange = (date) => {
        var endDate = new Date(date);
        endDate.setHours(23, 59, 0, 0);
        setSelectedDateEnd(endDate)
    }



    function onSelectDentistFunction(selectedList, selectedItem) {
        setSelectedDentist([selectedItem])
    }


    function onSelectTreatmentFunction(selectedList, selectedItem) {
        setSelectedTreatment([selectedItem])
    }

    function onRemoveTreatmentFunction(selectedList, removedItem) {
        const arr = selectedTreatment.filter(item => (item["name"] !== removedItem["name"]));
        setSelectedTreatment(arr)
    }


    async function filterResult() {
        var isInputOK = Boolean(selectedDateBegin) && Boolean(selectedDateEnd) && Boolean(selectedDentist);
        if (isInputOK) {
            var dentistName = "";
            selectedDentist.map(dentist => { (dentistName = dentistName + dentist.name) })

            var treatmentName = "";
            selectedTreatment.map(treatment => { (treatmentName = treatmentName + treatment.name) })

            var startlong = Boolean(selectedDateBegin) ? selectedDateBegin.getTime() : 0;
            var endlong = Boolean(selectedDateEnd) ? selectedDateEnd.getTime() : 0;
            var events = await helpers.loadItems(dentistName, treatmentName, startlong, endlong);
            console.log(events)
            getStatictics(events)
        }
        else {
            alert("There exists empty input, please select a doctor and both of dates")
        }

    }

    function getStatictics(events) {

        var workDayCount = 0;
        var tempDate = new Date(selectedDateBegin.getTime());
        while (tempDate.getTime() < selectedDateEnd.getTime()) {
            if (tempDate.getDay() !== 5 && tempDate.getDay() !== 6) {
                workDayCount++;
            }
            tempDate.setDate(tempDate.getDate() + 1);
        }

        var gain = 0;
        events.map(e => {
            gain = gain + e.type.price;
        })

        var totalAppointmentCount = Object.keys(events).length;
        setTotalGain(gain)
        setWorkLoad(totalAppointmentCount / (workDayCount * 7))
        setAppointmentCount(totalAppointmentCount)

    }


    return (

        <div className='calendarpage'>
            <div className='filter-calendar'>


                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify='space-around'>
                        <KeyboardDatePicker
                            disableToolbar
                            variant='inline'
                            format='MM/dd/yyyy'
                            margin='normal'
                            id='date-picker-inline'
                            label='Begin'
                            value={selectedDateBegin}
                            onChange={handleStartDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            disableToolbar
                            variant='inline'
                            format='MM/dd/yyyy'
                            margin='normal'
                            id='date-picker-inline'
                            label='End'
                            value={selectedDateEnd}
                            onChange={handleEndDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>


                <div className='choose-dentist'>
                    <Multiselect
                        options={[{ name: 'John Doe', id: 1 }, { name: 'Angela Merkel', id: 2 }, { name: 'Sergen Yalçın', id: 3 }]} // Options to display in the dropdown
                        selectedValues={selectedDentist} // Preselected value to persist in dropdown            
                        onSelect={onSelectDentistFunction} // Function will trigger on select event
                        displayValue="name" // Property name to display in the dropdown options
                    />
                </div>

                <div className='choose-dentist'>
                    <Multiselect

                        options={[{ name: 'Kanal tedavisi', id: 1 }, { name: 'Diş beyazlatma', id: 2 }, { name: 'Diş bakımı', id: 3 }]} // Options to display in the dropdown
                        selectedValues={selectedTreatment} // Preselected value to persist in dropdown            
                        onSelect={onSelectTreatmentFunction} // Function will trigger on select event
                        onRemove={onRemoveTreatmentFunction}
                        displayValue="name" // Property name to display in the dropdown options
                    />
                </div>

                <Button className='apply-button' onClick={() => filterResult()} variant='contained'>
                    APPLY
        </Button>

                <TextField
                    defaultValue={"Total Gain : " + totalGain}
                    margin="normal"
                    variant="outlined"
                    value={"Total Gain : " + totalGain}
                    disabled
                />

                <TextField
                    defaultValue={"Workload : " + workLoad}
                    margin="normal"
                    variant="outlined"
                    value={"Workload : " + workLoad}
                    disabled
                />

                <TextField
                    defaultValue={"Appointmetn Count : " + appointmentCount}
                    margin="normal"
                    variant="outlined"
                    value={"Appointmetn Count : " + appointmentCount}
                    disabled
                />
            </div>



        </div>
    )
}
