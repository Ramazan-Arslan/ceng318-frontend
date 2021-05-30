
import React, { useState, useEffect } from 'react';
import "./create-appointment.css";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Multiselect } from 'multiselect-react-dropdown'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import helpers from './create-appointment-helper';
import getTreatmentId from '../../helperFunctions/getTreatmentId';
import getDentistId from '../../helperFunctions/getDentistId';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import calendarHelpers from '../calendar.component/calendar-component-helper';
import getDentists from '../../helperFunctions/getDentists'
import getTreatments from '../../helperFunctions/getTreatments'

const dentists = getDentists.get();
const treatments = getTreatments.get();


export default function CreateAppointment() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [dentist, setDentist] = useState("");
  const [typeOfTreatment, setTypeOfTreatment] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState([]);
  const [closedHours, setClosedHours] = useState("");
  const [showHours, setShowHours] = useState(false);
  const [isSelected, setSelected] = useState(false);

  useEffect(async () => {
    var events = await calendarHelpers.loadItems("", "", "", 0, 0);
    setEvents(events);
  }, []);

  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };


  const handleDateChange = (date) => {
    if(Boolean(date))
    {
      date.setHours(0, 0, 0, 0);
      setSelectedDate(date);
      setShowHours(false);
    }
    else
    {
      setSelectedDate(null);
      setShowHours(false);
    }
  
  };

  const handleHourChange = (hour) => {
    setSelectedHour(hour);

  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleNameChange = (name) => {
    setName(name);
  };

  const handleAgeChange = (age) => {
    setAge(age);
  };

  const handleDescriptionChange = (description) => {
    setDescription(description);
  };

  const handlePhoneNumberChange = (number) => {
    setPhoneNumber(number);
  };

  const handleTypeOfTreatmentChange = (type) => {
    setTypeOfTreatment(type);
  };

  const handleDentistChange = (dentist) => {
    setDentist(dentist);
    setShowHours(false);
  };

  function setHours() {
    var closedHoursString = "";
    if (Boolean(selectedDate) && Boolean(dentist)) {
      events.map(e => {

        var appointmentDate = new Date(e.date);
        if (e.doctor.full_name === dentist
          && appointmentDate.getDate() === selectedDate.getDate()
          && appointmentDate.getMonth() === selectedDate.getMonth()
          && appointmentDate.getFullYear() === selectedDate.getFullYear()) {
          closedHoursString += e.hour + "-";
        }
      })
      setClosedHours(closedHoursString)
      setShowHours(true);
    }
  }

  function getHours() {

    var hourArray = ["09.00-10.00", "10.00-11.00", "11.00-12.00", "13.00-14.00", "14.00-15.00", "15.00-16.00", "16.00-17.00"]
    return (
      <div className="avaible-time">
        <p className="form-titles">Available Time</p>

        {getHourButton(hourArray[0])}
        {getHourButton(hourArray[1])}
        {getHourButton(hourArray[2])}
        {getHourButton(hourArray[3])}
        {getHourButton(hourArray[4])}
        {getHourButton(hourArray[5])}
        {getHourButton(hourArray[6])}

      </div>
    )
  }

  function getHourButton(hour) {

    if (closedHours.includes(hour)) {
      return (
        <Button variant="outlined" color="secondary" disabled={true}  >{hour}</Button>
      )
    }

    else {
      return (
        <Button className={selectedHour === hour ? 'button-selected' : 'button-unselected'} variant="outlined" color="primary" onClick={() => handleHourChange(hour)}  >{hour}</Button>
      )
    }

  }

  function onClickSetAppointment() {
    var treatmentId = getTreatmentId.getId(typeOfTreatment);
    var dentistId = getDentistId.getId(dentist);

    var isInputOK = Boolean(selectedDate) && Boolean(name) && Boolean(selectedHour) && Boolean(age) && Boolean(gender)
      && Boolean(description) && (treatmentId !== -1) && Boolean(phoneNumber) && (dentistId !== -1);

    if (isInputOK) {
      var hourArray = selectedHour.split("-")[0];
      var hour = hourArray.split(".")[0];
      var minute = hourArray.split(".")[1];
      selectedDate.setHours(hour, minute, 0, 0);

      var dateLong = selectedDate.getTime();
      var json =
      {
        date: dateLong,
        hour: selectedHour,
        doctor: { id: dentistId },
        type: { id: treatmentId },
        patient_name: name,
        patient_gender: gender,
        patient_phone: phoneNumber,
        patient_age: parseInt(age),
        description: description
      }

      helpers.createAppointment(json);
    }
    else {
      alert("There exists empty inputs !");
    }
  }


  return (
    <div className="create-appointment">
      <div className="create-appointment-left">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            minDate={new Date()}
            format="MM/dd/yyyy"
            shouldDisableDate={(date) => { return date.getDay() === 0 || date.getDay() === 6; }}
            value={selectedDate}
            onChange={(date) => { handleDateChange(date) }}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
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

        <Button
          className='choose-dentist-button'
          variant='contained'
          onClick={() => setHours()}
        >
          GET HOURS
          </Button>
        {showHours && getHours()}


        <p className="form-titles form-titles-header">Patient Details</p>
        <p className="form-titles">Full Name</p>
        <TextField
          defaultValue={name}
          margin="normal"
          variant="outlined"
          onChange={(event) => { handleNameChange(event.target.value) }} />

        <p className="form-titles">Age</p>
        <TextField
          defaultValue={age}
          type="number"
          margin="normal"
          variant="outlined"
          onChange={(event) => { handleAgeChange(event.target.value) }} />
      </div>

      <div className="create-appointment-right">
        <FormControl component="fieldset">

          <p className="form-titles">Gender</p>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={gender}
            onChange={handleGenderChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>

        <p className="form-titles">Type of Treatment</p>


        <Select
          className="type-of-treatment"
          value={typeOfTreatment}
          margin="normal"
          variant="outlined"
          onChange={(event) => { handleTypeOfTreatmentChange(event.target.value) }}
        >
          {treatments.map((item, index) =>
            <MenuItem value={item.name}>{item.name}</MenuItem>
          )}
          
        </Select>



        <p className="form-titles">Phone Number</p>
        <TextField
          defaultValue={phoneNumber}
          type="number"
          margin="normal"
          variant="outlined"
          onChange={(event) => { handlePhoneNumberChange(event.target.value) }} />

        <p className="form-titles">Description</p>
        <TextField
          defaultValue={description}
          multiline rows="3"
          margin="normal"
          variant="filled"
          onChange={(event) => { handleDescriptionChange(event.target.value) }} />

        <Button
          variant="contained"
          color="primary"

          onClick={() => { onClickSetAppointment() }}
          className="setButton">
          Set Appointment
        </Button>
      </div>
    </div>
  );
}
