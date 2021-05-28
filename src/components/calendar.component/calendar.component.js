import events from '../../event'
import React, { useState } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import './calendar.component.css'
import style from 'react-big-calendar/lib/css/react-big-calendar.css'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import 'date-fns'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
const localizer = momentLocalizer(moment)

let allViews = Object.keys(Views).map((k) => Views[k])

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
  const [showDentist, setShowDentist] = useState(true)
  const [showTreatmentType, setShowTreatmentType] = useState(true)
  const [patient, setPatient] = useState('')
  const [modalIsOpen, setOpenModal] = useState(false)
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [age, setAge] = useState('')
  const [typeOfTreatment, setTypeOfTreatment] = useState('')
  const [description, setDescription] = useState('')
  const [selectedDateBegin, setSelectedDateBegin] = React.useState(new Date())
  const [selectedDateEnd, setSelectedDateEnd] = React.useState(new Date())

  const handleDateChange = (date) => {
    setSelectedDateBegin(date)
  }

  const handleDateChange2 = (date) => {
    setSelectedDateEnd(date)
  }

  const onEventClick = (event) => {
    /*alert(event.id + ' ' + event.title + ' ' + event.start + ' ' + event.end) //Shows the event details provided while booking*/
    setFullName('Bekir Yörük')
    setPhoneNumber('555 555 55 55')
    setAge('29')
    setTypeOfTreatment(event.title)
    setDescription('description of the treatment')
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const [state, setState] = React.useState({
    dentist1: true,
    dentist2: true,
    dentist3: true,
    type1: true,
    type2: true,
    type3: true,
    type4: true,
  })

  const showPopup = () => {
    alert('Message is received')
  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  return (
    <div className='calendarpage'>
      <div className='filter-calendar'>
        <form className={classes.root} noValidate autoComplete='off'>
          <TextField
            id='standard-basic'
            label='Enter a patient name'
            value={patient}
            onChange={(event) => setPatient(event.target.value)}
          />
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
                onChange={handleDateChange}
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
                onChange={handleDateChange2}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </form>
        <div className='choose-dentist'>
          <Button
            className='choose-dentist-button'
            variant='contained'
            onClick={() => setShowDentist(!showDentist)}
          >
            Choose a Dentist
          </Button>
          <div className='filter-dentist-list'>
            {showDentist && (
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.dentist1}
                      onChange={handleChange}
                      name='dentist1'
                      color='primary'
                    />
                  }
                  label='Dentist 1'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.dentist2}
                      onChange={handleChange}
                      name='dentist2'
                      color='primary'
                    />
                  }
                  label='Dentis 2'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.dentist3}
                      onChange={handleChange}
                      name='dentist3'
                      color='primary'
                    />
                  }
                  label='Dentist 3'
                />
              </FormGroup>
            )}
          </div>
        </div>
        <div>
          <Button
            variant='contained'
            onClick={() => setShowTreatmentType(!showTreatmentType)}
            className='choose-treatment-type-button'
          >
            Treatment Type
          </Button>
          {showTreatmentType && (
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.type1}
                    onChange={handleChange}
                    name='type1'
                    color='primary'
                  />
                }
                label='type1'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.type2}
                    onChange={handleChange}
                    name='type2'
                    color='primary'
                  />
                }
                label='type2'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.type3}
                    onChange={handleChange}
                    name='type3'
                    color='primary'
                  />
                }
                label='type3'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.type4}
                    onChange={handleChange}
                    name='type4'
                    color='primary'
                  />
                }
                label='type4'
              />
            </FormGroup>
          )}
        </div>
        <Button className='apply-button' variant='contained'>
          APPLY
        </Button>
      </div>

      <div className='calendar-component'>
        <Calendar
          localizer={localizer}
          events={events}
          defaultView={'month'}
          step={60}
          style={style}
          showMultiDayTimes
          onSelectEvent={(event) => onEventClick(event)}
          components={{
            timeSlotWrapper: ColoredDateCellWrapper,
          }}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 550, width: 1200 }}
        />
        <p className='total-gain'>Total Gain: 2000 TL</p>
      </div>

      <Modal
        className='modal'
        open={modalIsOpen}
        onClose={handleClose}
        disablePortal
        disableEnforceFocus
        disableAutoFocus
      >
        <div className='modal-content'>
          <h5>Patient Detail</h5>
          <p className='modal-title'>Full Name</p>
          <TextField
            defaultValue={fullName}
            margin='normal'
            variant='outlined'
            disabled
          />
          <p className='modal-title'>Phone Number</p>
          <TextField
            defaultValue={phoneNumber}
            margin='normal'
            variant='outlined'
            disabled
          />
          <p className='modal-title'>Age</p>
          <TextField
            defaultValue={age}
            margin='normal'
            variant='outlined'
            disabled
          />
          <p className='modal-title'>Type of Treatment</p>
          <TextField
            defaultValue={typeOfTreatment}
            margin='normal'
            variant='outlined'
            disabled
          />
          <p className='modal-title'>Description</p>
          <TextField
            defaultValue={description}
            margin='normal'
            variant='outlined'
            disabled
          />
        </div>
      </Modal>
    </div>
  )
}
