import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import './calendar.component.css'
import style from 'react-big-calendar/lib/css/react-big-calendar.css'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Multiselect } from 'multiselect-react-dropdown'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import 'date-fns'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers'
import helpers from './calendar-component-helper'

const localizer = momentLocalizer(moment)
const nowDate = new Date();

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))






export default function CalendarPage(props) {
  const classes = useStyles()
  const [filterPatient, setFilterPatient] = useState("")
  const [appointments, setAppointments] = useState([])
  const [selectedDentists, setSelectedDentists] = useState([]);
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [modalIsOpen, setOpenModal] = useState(false);
  const [event, setSelectedEvent] = useState(null);
  const [selectedDateBegin, setSelectedDateBegin] = useState(null)
  const [selectedDateEnd, setSelectedDateEnd] = useState(null)



  useEffect(async () => {
    var events = await helpers.loadItems("", "", "", 0, 0);
    setAppointments(events);
  }, []);



  const onEventClick = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  }

  const handleStartDateChange = (date) => {
    var startDate = new Date(date);
    startDate.setHours(0,0,0,0);
    setSelectedDateBegin(startDate)
  }

  const handleEndDateChange = (date) => {
    var endDate = new Date(date);
    endDate.setHours(23,59,0,0);
    setSelectedDateEnd(endDate)
  }

  const handleClose = () => {
    setOpenModal(false)
  }


  function onSelectDentistFunction(selectedList, selectedItem) {
    selectedDentists.push(selectedItem);
  }

  function onRemoveDentistFunction(selectedList, removedItem) {
    const arr = selectedDentists.filter(item => (item["name"] !== removedItem["name"]));
    setSelectedDentists(arr)
  }


  function onSelectTreatmentFunction(selectedList, selectedItem) {
    selectedTreatments.push(selectedItem);
  }

  function onRemoveTreatmentFunction(selectedList, removedItem) {
    const arr = selectedTreatments.filter(item => (item["name"] !== removedItem["name"]));
    setSelectedTreatments(arr)
  }

  async function filterResult() {
    var selectedDentistsString = "";
    selectedDentists.map(dentist => { (selectedDentistsString = selectedDentistsString + dentist.name + "-") })

    var selectedTreatmentsString = "";
    selectedTreatments.map(treatment => { (selectedTreatmentsString = selectedTreatmentsString + treatment.name + "-") })
    var startlong = Boolean(selectedDateBegin) ? selectedDateBegin.getTime() : 0;
    var endlong = Boolean(selectedDateEnd) ? selectedDateEnd.getTime() : 0;
    var events = await helpers.loadItems(filterPatient, selectedDentistsString, selectedTreatmentsString, startlong, endlong);
    setAppointments(events);
  }

  async function removeAppointment(event) {
    helpers.removeAppointment(event.id);
  }






  return (
 
    <div className='calendarpage'>
      <div className='filter-calendar'>

        <form className={classes.root} noValidate autoComplete='off'>
          <TextField
            id='standard-basic'
            label='Enter a patient name'
            value={filterPatient}
            onChange={(event) => setFilterPatient(event.target.value)}
          />
        </form>

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
            selectedValues={selectedDentists} // Preselected value to persist in dropdown
            onSelect={onSelectDentistFunction} // Function will trigger on select event
            onRemove={onRemoveDentistFunction} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
          />
        </div>

        <div>

          <Multiselect
            options={[{ name: 'Kanal tedavisi', id: 1 }, { name: 'Diş beyazlatma', id: 2 }, { name: 'Diş bakımı', id: 3 }]} // Options to display in the dropdown
            selectedValues={selectedTreatments} // Preselected value to persist in dropdown
            onSelect={onSelectTreatmentFunction} // Function will trigger on select event
            onRemove={onRemoveTreatmentFunction} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
          />
        </div>
        <Button className='apply-button' onClick={() => filterResult()} variant='contained'>
          APPLY
        </Button>
      </div>



      <div className='calendar-component'>
        <Calendar
          localizer={localizer}
          events={Object.values(appointments)}
          defaultView={'month'}
          step={60}
          style={style}          
          timeslots={1} 
          min={
            new Date(
              nowDate.getFullYear(), 
              nowDate.getMonth(), 
              nowDate.getDate(), 
              9
            )
          }

          max={
            new Date(
              nowDate.getFullYear(), 
              nowDate.getMonth(), 
              nowDate.getDate(), 
              17
            )
          }
          showMultiDayTimes
          onSelectEvent={(event) => onEventClick(event)}
          components={{
            timeSlotWrapper: ColoredDateCellWrapper,
          }}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 550, width: 1200 }}
        />
      </div>

      { Boolean(event) && <Modal
        className="modal"
        open={modalIsOpen}
        onClose={handleClose}
        disablePortal
        disableEnforceFocus
        disableAutoFocus

      >
        <div className="modal-content">
          <h5>Patient Detail</h5>
          <p className="modal-title">Full Name</p>
          <TextField
            defaultValue={event.patient_name}
            margin="normal"
            variant="outlined"
            disabled
          />
          <p className="modal-title">Phone Number</p>
          <TextField
            defaultValue={event.patient_phone}
            margin="normal"
            variant="outlined"
            disabled
          />
          <p className="modal-title">Age</p>
          <TextField
            defaultValue={event.patient_age}
            margin="normal"
            variant="outlined"
            disabled
          />
          <p className="modal-title">Type of Treatment</p>
          <TextField
            defaultValue={event.type.type}
            margin="normal"
            variant="outlined"
            disabled
          />

          <p className="modal-title">Doctor</p>
          <TextField
            defaultValue={event.doctor.full_name}
            margin="normal"
            variant="outlined"
            disabled
          />

          <p className="modal-title">Hour</p>
          <TextField
            defaultValue={event.hour}
            margin="normal"
            variant="outlined"
            disabled
          />
          <p className="modal-title">Description</p>
          <TextField
            defaultValue={event.description}
            margin="normal"
            variant="outlined"
            disabled
          />

          <Button className='apply-button' onClick={() => removeAppointment(event)} variant='contained'>
            Remove
        </Button>
        </div>
      </Modal>}

    </div>
  )
}
