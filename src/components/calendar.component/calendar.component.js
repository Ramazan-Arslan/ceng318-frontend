import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import './calendar.component.css'
import style from 'react-big-calendar/lib/css/react-big-calendar.css'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import { Multiselect } from 'multiselect-react-dropdown'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import 'date-fns'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers'
import helpers from './calendar-component-helper'
import LinearProgress from '@material-ui/core/LinearProgress';
const BorderLinearProgressDentist1 = withStyles((theme) => ({
  root: {
    height: 25,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#FFE4E6",
  },
}))(LinearProgress);
const BorderLinearProgressDentist2 = withStyles((theme) => ({
  root: {
    height: 25,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#56CCF2",
  },
}))(LinearProgress);
const BorderLinearProgressDentist3 = withStyles((theme) => ({
  root: {
    height: 25,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#BB6BD9",
  },
}))(LinearProgress);

const localizer = momentLocalizer(moment)
const nowDate = new Date();

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'black',
    },
  })

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      flexGrow: 1,

    },
  },
}))






export default function CalendarPage(props) {
  const classes = useStyles()
  const [filterPatient, setFilterPatient] = useState("")
  const [gains, setGains] = useState({ "John Doe": 0, "Angela Merkel": 0, "Sergen Yalçın": 0 })
  const [workLoadCounts, setWorkLoadCounts] = useState({ "John Doe": 0, "Angela Merkel": 0, "Sergen Yalçın": 0 })
  const [treatmentTypeCounts, setTreatmentTypeCounts] = useState(
    {
      "John Doe": { "Kanal tedavisi": 0, "Diş beyazlatma": 0, "Diş bakımı": 0 },
      "Angela Merkel": { "Kanal tedavisi": 0, "Diş beyazlatma": 0, "Diş bakımı": 0 },
      "Sergen Yalçın": { "Kanal tedavisi": 0, "Diş beyazlatma": 0, "Diş bakımı": 0 }
    })
  const [appointments, setAppointments] = useState([])
  const [selectedDentists, setSelectedDentists] = useState([]);
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [modalIsOpen, setOpenModal] = useState(false);
  const [event, setSelectedEvent] = useState(null);
  const [selectedDateBegin, setSelectedDateBegin] = useState(null)
  const [selectedDateEnd, setSelectedDateEnd] = useState(null)
  const [workDayCount, setWorkDayCount] = useState(0)
  const [totalAppointmentCount, setTotalAppointmentCount] = useState(0)
  const [tempEvent, setTempEvent] = useState({})
  const nowDate = new Date();



  useEffect(async () => {
    var events = await helpers.loadItems("", "", "", 0, 0);
    setAppointments(events);
    getStatictics(events);
  }, []);



  const onEventClick = (event) => {
    setTempEvent(JSON.parse(JSON.stringify(event)));
    setSelectedEvent(event);
    setOpenModal(true);
  }

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
    getStatictics(events)
  }

  async function removeAppointment(event) {
    helpers.removeAppointment(event.id);
  }



  function getStatictics(events) {

    var workDayCount = 0;
    if (Boolean(selectedDateBegin) && Boolean(selectedDateEnd)) {
      var tempDate = new Date(selectedDateBegin.getTime());
      while (tempDate.getTime() < selectedDateEnd.getTime()) {
        if (tempDate.getDay() !== 5 && tempDate.getDay() !== 6) {
          workDayCount++;
        }
        tempDate.setDate(tempDate.getDate() + 1);
      }
    }

    setWorkDayCount(workDayCount)


    var tempGains = ({ "John Doe": 0, "Angela Merkel": 0, "Sergen Yalçın": 0 })
    var tempWorkLoads = ({ "John Doe": 0, "Angela Merkel": 0, "Sergen Yalçın": 0 })
    var tempTreatmentCounts = (
      {
        "John Doe": { "Kanal tedavisi": 0, "Diş beyazlatma": 0, "Diş bakımı": 0 },
        "Angela Merkel": { "Kanal tedavisi": 0, "Diş beyazlatma": 0, "Diş bakımı": 0 },
        "Sergen Yalçın": { "Kanal tedavisi": 0, "Diş beyazlatma": 0, "Diş bakımı": 0 }
      })





    events.map(e => {
      tempGains[e.doctor.full_name] += e.type.price;
      tempWorkLoads[e.doctor.full_name] += 1;
      tempTreatmentCounts[e.doctor.full_name][e.type.type] += 1;
    })


    setGains(tempGains)
    setWorkLoadCounts(tempWorkLoads)
    setTreatmentTypeCounts(tempTreatmentCounts)

    var totalAppointmentCount = Object.keys(events).length;

    setTotalAppointmentCount(totalAppointmentCount)

  }


  function getGainsText() {
    return ("Angela Merkel : " + gains['Angela Merkel'] + " - " + "John Doe : " + gains['John Doe'] + " - " + "Sergen Yalçın : " + gains['Sergen Yalçın'])
  }

  function getTreatmentCountText() {
    return ("Angela Merkel : " + " Kanal tedavisi : " + treatmentTypeCounts['Angela Merkel']['Kanal tedavisi']
      + " - Diş Bakımı : " + treatmentTypeCounts['Angela Merkel']['Diş bakımı']
      + " - Diş beyazlatma : " + treatmentTypeCounts['Angela Merkel']['Diş beyazlatma']

      + " ||| John Doe : " + " Kanal tedavisi : " + treatmentTypeCounts['John Doe']['Kanal tedavisi']
      + " - Diş Bakımı : " + treatmentTypeCounts['John Doe']['Diş bakımı']
      + " - Diş beyazlatma : " + treatmentTypeCounts['John Doe']['Diş beyazlatma']

      + " ||| Sergen Yalçın : " + " Kanal tedavisi : " + treatmentTypeCounts['Sergen Yalçın']['Kanal tedavisi']
      + " - Diş Bakımı : " + treatmentTypeCounts['Sergen Yalçın']['Diş bakımı']
      + " - Diş beyazlatma : " + treatmentTypeCounts['Sergen Yalçın']['Diş beyazlatma'])
  }


  function getWorkLoadCountText() {
    if (workDayCount !== 0) {
      return ("Angela Merkel : " + 100 * parseInt(workLoadCounts['Angela Merkel']) / (workDayCount * 7) + " - " + "John Doe : " + 100 * parseInt(workLoadCounts['John Doe']) / (workDayCount * 7) + " - " + "Sergen Yalçın : " + 100 * parseInt(workLoadCounts['Sergen Yalçın']) / (workDayCount * 7));

    }
    else {
      return ("Angela Merkel : " + workLoadCounts['Angela Merkel'] + " - " + "John Doe : " + workLoadCounts['John Doe'] + " - " + "Sergen Yalçın : " + workLoadCounts['Sergen Yalçın']);

    }
  }


  async function updateAppointment(event) {
    var json =
    {
      id: event.id,
      date: event.date,
      hour: event.hour,
      doctor: { id: event.doctor.id },
      type: { id: event.type.id },
      patient_name: event.patient_name,
      patient_gender: event.patient_gender,
      patient_phone: event.patient_phone,
      patient_age: event.patient_age,
      description: event.description
    }

    await helpers.updateAppointment(json);
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
            placeholder="Choose a doctor"
          />
        </div>

        <div className='choose-treatment'>

          <Multiselect
            options={[{ name: 'Kanal tedavisi', id: 1 }, { name: 'Diş beyazlatma', id: 2 }, { name: 'Diş bakımı', id: 3 }]} // Options to display in the dropdown
            selectedValues={selectedTreatments} // Preselected value to persist in dropdown
            onSelect={onSelectTreatmentFunction} // Function will trigger on select event
            onRemove={onRemoveTreatmentFunction} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
            placeholder="Treatment Type"
          />
        </div>
        <Button className='apply-button' onClick={() => filterResult()} variant='contained'>
          APPLY
        </Button>

        <form>
          <label>
            {"Gains: " + getGainsText()}
          </label>
        </form>
        <form>
          <label>
            {"Treatments: " + getTreatmentCountText()}
          </label>
        </form>
        <form>
          <label>
            {"Workload: " + getWorkLoadCountText()}
          </label>
        </form>


      </div>




      <div className='calendar-component'>
        <Calendar
          localizer={localizer}
          events={Object.values(appointments)}
          defaultView={'month'}
          step={60}

          style={style}
          timeslots={1}
          showMultiDayTimes
          onSelectEvent={(event) => onEventClick(event)}
          components={{
            timeSlotWrapper: ColoredDateCellWrapper,
          }}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 550, width: 1150 }}
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

          eventPropGetter={
            (event, start, end, isSelected) => {
              let newStyle = {
                backgroundColor: "purple",
                borderRadius: "0px",
                border: "none"
              };

              if (event.doctor.full_name == "Sergen Yalçın") {
                newStyle.backgroundColor = "rgb(177 75 83)"


              }
              else if (event.doctor.full_name == "John Doe") {
                newStyle.backgroundColor = "#56CCF2"

              } else {
                newStyle.backgroundColor = "#BB6BD9"

              }

              return {
                className: "",
                style: newStyle
              };
            }
          }
        />

        <div className={classes.root}>
          <div className='percentage-dentist-all'>
            <div className='percentage-dentist'>
              <p className='percentage-dentist-p'>Sergen Yalçın</p>
              <BorderLinearProgressDentist1 variant="determinate" value={workLoadCounts['Sergen Yalçın']} />
            </div>
            <div className='percentage-dentist'>
              <p className='percentage-dentist-p'>John Doe</p>
              <BorderLinearProgressDentist2 variant="determinate" value={workLoadCounts['John Doe']} />
            </div>
            <div className='percentage-dentist'>
              <p className='percentage-dentist-p'>Angela Merkel</p>
              <BorderLinearProgressDentist3 variant="determinate" value={workLoadCounts['Angela Merkel']} />
            </div>
          </div>
        </div>
      </div>



      {Boolean(event) && <Modal
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
            onChange={(input) => { tempEvent["patient_name"] = (input.target.value) }}
          />
          <p className="modal-title">Phone Number</p>
          <TextField
            defaultValue={event.patient_phone}
            margin="normal"
            variant="outlined"
            onChange={(input) => { tempEvent["patient_phone"] = (input.target.value) }}
          />
          <p className="modal-title">Age</p>
          <TextField
            defaultValue={event.patient_age}
            margin="normal"
            type="number"
            variant="outlined"
            onChange={(input) => { tempEvent["patient_age"] = parseInt(input.target.value) }}
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
            onChange={(input) => { tempEvent["description"] = (input.target.value) }}
          />
          <p className="modal-title"></p>

          <div className="button-wrapper">
            <Button className='apply-button'
              onClick={() => removeAppointment(event)}
              variant='contained'>
              Remove
          </Button>
          </div>

          <div className="button-wrapper">
            <Button className='apply-button'
              onClick={() => updateAppointment(tempEvent)}
              variant='contained'>
              Update
          </Button>
          </div>
        </div>
      </Modal>}
    </div >
  )
}