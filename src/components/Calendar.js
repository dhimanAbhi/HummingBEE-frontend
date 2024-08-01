import React from 'react'
import '../styles/calendar.css'
import DateTimeComp from './DateTimeComp'
function Calendar() {
  return (
    <div className='calendar-container'>
      <div className='calendar-contents'>
        <div className='calendar-headings'>
          <div>Hey, there</div>
          <div>brocodemaker@gmail.com</div>
        </div>
        <div className='calendar-event'>
          <div className='calendar-event-head'>START OF EVENT</div>
          <DateTimeComp />  
        </div>
        <div className='calendar-event'>
          <div className='calendar-event-head'>END OF EVENT</div>
          <DateTimeComp />  
        </div>
        <div className='calendar-event-name'>
          <div className='calendar-event-head'>NAME OF THE EVENT</div>
          <input type="text" className='event-name' placeholder='EVENT NAME'/>
        </div>
        <div className='calendar-event-name'>
          <div className='calendar-event-head'>EVENT DESCRIPTION</div>
          <input type="text" className='event-name' placeholder='EVENT NAME'/>
        </div>
        <div className='calendar-event-btns'>
          <button  className='create-event'> Create Calendar Event</button>
          <button  className='calendar-event-signout'> Sign out</button>
        </div>
      </div>
    </div>
  )
}

export default Calendar