import React, { useState } from 'react';
import DateTime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import '../styles/dateTime.css'; // Assuming you have your CSS in App.css
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import styled from '@emotion/styled';
const DateTimeComp = () => {
    const [date, setDate] = useState(null);

    return (
        <>
         
                <DateTime
                    value={date}
                    onChange={date => setDate(date)}
                    inputProps={{ placeholder: 'MM/DD/YYYY HH:mm A' }}
                    renderInput={(props, openCalendar) => (
                        <div className="input-container">
                            <input {...props} />
                            <button onClick={openCalendar} className="calendar-button"><Cal /> </button>
                        </div>
                    )}
                />
         
        </>
    );
};


const Cal = styled(CalendarTodayIcon)`
    color:#008080;
    height:100%;
`

export default DateTimeComp;
