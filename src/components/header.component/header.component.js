import React, { useState, useEffect } from 'react';
import CalendarPage from '../calendar.component/calendar.component'
import './header.component.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import CreateAppointment from '../create-appoinment/create-appointment'
import { LocalDiningOutlined } from '@material-ui/icons'

const routes = [
  {
    key: 1,
    name: 'Calendar',
    path: '/calendar',
    component: CalendarPage,
  },
  {
    key: 2,
    name: 'Create Appointment',
    path: '/createAppointment',
    component: CreateAppointment,
  },
]

export default function Header() {

  const [userName, setUserName] = useState("Secretary")

  useEffect(async () => {
    var loggedInUserName = localStorage.getItem("userName");
    setUserName(loggedInUserName);
  }, []);

  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
  }

  function logout()
  {
    localStorage.removeItem("userName");    
    localStorage.removeItem("token");

    window.history.pushState(null, "Dentist Appointment App", "/")
    window.location.reload(true);
  }



  return (
    <div className='header'>
      <div className='left-part'>
        <p className='logo'>CENG318</p>
        <Router>
          {routes.map((route) => (
            <p className='route'>
              <Link className='link-class' to={route.path}>
                {route.name}
              </Link>
            </p>
          ))}
          {routes.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              component={route.component}
            />
          ))}
        </Router>
      </div>
      <div className='user-info'>
        <p className='user-name-surname'>{userName}</p>
        <Button className='logout-button' variant='contained' onClick={() =>{logout()}}>
          Log out
        </Button>
      </div>
    </div>
  )
}