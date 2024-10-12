import { useState } from 'react'
import './Root.css'
import { Outlet } from 'react-router-dom'
import { TimerContext } from './contexts/TimerContext'

function Root() {

  const [timers, setTimers] = useState([])

  return (
      <TimerContext.Provider value={{timers, setTimers}}>
          <Outlet />
      </TimerContext.Provider>
  )
}

export default Root
