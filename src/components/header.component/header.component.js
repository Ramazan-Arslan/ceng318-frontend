import React from 'react'
import Calendar from '../calendar.component/calendar.component'
import './header.component.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

const routes = [
  {
    key: 1,
    name: 'Calendar',
    path: '/calendar',
    component: Calendar,
  },
  {
    key: 2,
    name: 'Create Appointment',
    path: '/calendar',
    component: Calendar,
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
        <p className='user-name-surname'>Ramazan Arslan</p>
        <Button className='logout-button'>Log Out</Button>
      </div>
    </div>
  )
}
