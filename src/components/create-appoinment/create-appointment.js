import React from "react";
import "./create-appointment.css";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";


export default function CreateAppointment() {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [value, setValue] = React.useState("female");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="create-appointment">
      <div className="create-appointment-left">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <div className="avaible-time">
          <p className="form-titles">Available Time</p>
          <Button variant="outlined" color="primary">
            09.00 - 10.00 AM
          </Button>
          <Button variant="outlined" color="primary">
            10.00 - 11.00 AM
          </Button>
          <Button variant="outlined" color="primary">
            11.00 - 12.00 AM
          </Button>
          <Button variant="contained" color="secondary">
            13.00 - 14.00 PM
          </Button>
          <Button variant="contained" color="secondary">
            14.00 - 15.00 PM
          </Button>
          <Button variant="outlined" color="primary">
            15.00 - 16.00 AM
          </Button>
          <Button variant="outlined" color="primary">
            16.00 - 17.00 AM
          </Button>
        </div>
        <p className="form-titles form-titles-header">Patient Details</p>
        <p className="form-titles">Full Name</p>
        <TextField defaultValue="" margin="normal" variant="outlined" />
        <p className="form-titles">Age</p>
        <TextField defaultValue="" margin="normal" variant="outlined" />
      </div>
      <div className="create-appointment-right">
        <FormControl component="fieldset">
          <p className="form-titles">Gender</p>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={value}
            onChange={handleChange}
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
        <TextField defaultValue="" margin="normal" variant="outlined" />
        <p className="form-titles">Phone Number</p>
        <TextField defaultValue="" margin="normal" variant="outlined" />
        <p className="form-titles">Description</p>
        <TextField multiline rows="3" margin="normal" variant="filled" />
        <Button variant="contained" color="primary" className="setButton">
          Set Appointment
        </Button>
      </div>
    </div>
  );
}
