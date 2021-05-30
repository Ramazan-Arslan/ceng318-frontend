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
import LinearProgress from '@material-ui/core/LinearProgress'
import getDentists from '../../helperFunctions/getDentists'
import getTreatments from '../../helperFunctions/getTreatments'
import getJsons from '../../helperFunctions/getStaticticsJson'
import DeleteIcon from '@material-ui/icons/Delete';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const dentists = getDentists.get();
const treatments = getTreatments.get();


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
  const [gains, setGains] = useState(getJsons.getGains())
  const [workLoadCounts, setWorkLoadCounts] = useState(getJsons.getWorkloads())
  const [treatmentTypeCounts, setTreatmentTypeCounts] = useState(getJsons.getTreatments())
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

  const [deleteModal, setDeleteModal] = useState(false);
  const [dentist, setDentist] = useState("");

  const [statisticsModal, setStatisticsModal] = useState(false);


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

  const handleDeleteModalClose = () => {
    setDeleteModal(false)
  }

  const handleStatisticsModalClose = () => {
    setStatisticsModal(false)
  }

  const handleDentistChange = (dentist) => {
    setDentist(dentist);
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


    var tempGains = (getJsons.getGains())
    var tempWorkLoads = (getJsons.getWorkloads())
    var tempTreatmentCounts = (getJsons.getTreatments())





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
    var gainText="";
    dentists.forEach(element => {
      gainText += " | " + element.name +" : " + gains[element.name] + " | ";
    });
    return gainText;
   }

  function getTreatmentCountText() {
    var treatmentText="";
    dentists.forEach(element => {
      treatmentText += element.name + " : ";
      treatments.forEach(treatmentElement =>
        {
          treatmentText += treatmentElement.name +" : " + treatmentTypeCounts[element.name][treatmentElement.name] + "  ";
        })
      treatmentText += " ~~~~ "
     
    });
    return treatmentText;
  }


  function getWorkLoadCountText() {
    var workDayText="";
    if (workDayCount !== 0) {
      dentists.forEach(element => {
        workDayText += " | " + element.name +" : " + 100 * parseInt(workLoadCounts[element.name]) / (workDayCount * 7) + " | ";
      });
      return workDayText;
  
    }
    else {
      dentists.forEach(element => {
        workDayText += " | " + element.name +" : " +workLoadCounts[element.name] + " | ";
      });

      return workDayText;
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

  function getProgressBarView(item) {
    const BorderLinearProgressDentist = withStyles((theme) => ({
      root: {
        height: 25,
        borderRadius: 5,
      },
      colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
      },
      bar: {
        borderRadius: 5,
        backgroundColor: item.color,
      },
    }))(LinearProgress);
    if(workDayCount != 0){
      return (
        <BorderLinearProgressDentist variant="determinate" value={100 * parseInt(workLoadCounts[item.name]) / (workDayCount * 7)} />
  
      )
    }
    else{
      <BorderLinearProgressDentist variant="determinate" value={0 * parseInt(workLoadCounts[item.name]) / (workDayCount * 7)} />
    }
  }


  function getBars() {
    return (
      <div className="bar-wrapper">
        {dentists.map((item, index) => (
          <div className='percentage-dentist'>
            <div className="p-wrapper"><p className='percentage-dentist-p'>{item.name}</p>
            <p className='dentinst-gain'>{"₺"+gains[item.name]}</p></div>
            {getProgressBarView(item)}
          </div>
        ))}
      </div>
    );
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
            options={dentists} // Options to display in the dropdown
            selectedValues={selectedDentists} // Preselected value to persist in dropdown
            onSelect={onSelectDentistFunction} // Function will trigger on select event
            onRemove={onRemoveDentistFunction} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
            placeholder="Choose a doctor"
          />
        </div>

        <div className='choose-treatment'>

          <Multiselect
            options={treatments} // Options to display in the dropdown
            selectedValues={selectedTreatments} // Preselected value to persist in dropdown
            onSelect={onSelectTreatmentFunction} // Function will trigger on select event
            onRemove={onRemoveTreatmentFunction} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
            placeholder="Treatment Type"
          />
        </div>
        <div className='filter-buttons'>
          <Button className='apply-button buttonfilter' onClick={() => filterResult()} variant='contained'>
            APPLY
          </Button>


          <Button className='buttonfilter' variant="contained" onClick={() => setStatisticsModal(true)}>
          See Statics
        </Button>

          <Button className='buttonfilter' variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => setDeleteModal(true)}>
          Delete Appointments
        </Button>
      </div>
      </div>
      <Modal
        className="delete-appointment"
        open={deleteModal}
        onClose={handleDeleteModalClose}
        disablePortal
        disableEnforceFocus
        disableAutoFocus

      >
         <div className="delete-appointment-content">
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify='center'>
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              id='date-picker-inline'
              label='Start Date'
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
              label='End Date'
              value={selectedDateEnd}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>

        <p className="form-titles">Dentist</p>
        <Select
          className="type-of-treatment"
          value={dentist}
          margin="normal"
          variant="outlined"
          onChange={(event) => { handleDentistChange(event.target.value) }}
        >
           {dentists.map((item, index) =>
            <MenuItem value={item.name}>{item.name}</MenuItem>
          )}
         
        </Select>
        <Button variant="contained" color="secondary" style={{marginTop:"20px",marginBottom:"10px"}}>
          Remove
        </Button>
         </div>
 
      </Modal>


      <Modal
        className="statistics-modal"
        open={statisticsModal}
        onClose={handleStatisticsModalClose}
        disablePortal
        disableEnforceFocus
        disableAutoFocus

      >
         <div className="statistics-modal-content">
         <form>
          <label>
            {"Treatments: " +  getTreatmentCountText()}
          </label>
        </form>
         </div>
 
      </Modal>




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
          style={{ height: 525, width: 1150 }}
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

              if (event.doctor.full_name == "Sena Güzel") {
                newStyle.backgroundColor = "rgb(177 75 83)"


              }
              else if (event.doctor.full_name == "Halil Biricik") {
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
            {getBars()}
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
            className="modal-input"
            defaultValue={event.patient_name}
            margin="normal"
            variant="outlined"
            onChange={(input) => { tempEvent["patient_name"] = (input.target.value) }}
          />
          <p className="modal-title">Phone Number</p>
          <TextField
            className="modal-input"
            defaultValue={event.patient_phone}
            margin="normal"
            variant="outlined"
            onChange={(input) => { tempEvent["patient_phone"] = (input.target.value) }}
          />
          <p className="modal-title">Age</p>
          <TextField
            className="modal-input"
            defaultValue={event.patient_age}
            margin="normal"
            type="number"
            variant="outlined"
            onChange={(input) => { tempEvent["patient_age"] = parseInt(input.target.value) }}
          />
          <p className="modal-title">Type of Treatment</p>
          <TextField
            className="modal-input"
            defaultValue={event.type.type}
            margin="normal"
            variant="outlined"
            disabled
          />

          <p className="modal-title">Doctor</p>
          <TextField
            className="modal-input"
            defaultValue={event.doctor.full_name}
            margin="normal"
            variant="outlined"
            disabled
          />

          <p className="modal-title">Hour</p>
          <TextField
            className="modal-input"
            defaultValue={event.hour}
            margin="normal"
            variant="outlined"
            disabled
          />
          <p className="modal-title">Description</p>
          <TextField
            className="modal-input"
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