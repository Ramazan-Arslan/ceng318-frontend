import React from 'react'
import CalendarPage from '../calendar.component/calendar.component'
import './header.component.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import CreateAppointment from '../create-appoinment/create-appointment'

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
  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
  }
  return (
    <div className='header'>
      <div className='left-part'>
        <p className='logo'>CENG318</p>
        <Router>
          {routes.map((route) => (
            <p className='route'>
              <Link style={linkStyle} to={route.path}>
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
        <p className='user-name-surname'>My Secreter</p>
        <Button className='logout-button' variant='contained'>
          Log out
        </Button>
      </div>
    </div>
  )
}
