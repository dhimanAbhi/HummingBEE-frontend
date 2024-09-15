import React, {useState} from 'react'
import '../styles/requestleave.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function Requestleave() {

    const [fromDate, setFromDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [fromDateToggle, setfromDateToggle] = useState(true)
    const [toDateToggle, setToDateToggle] = useState(true)
    const [leaveCategory, setLeaveCategory] = useState(''); // State to track selected leave category
    const [leaveNote, setLeaveNote] = useState('');

    const handleNoteChange = (event) => {
        setLeaveNote(event.target.value);
      };
    const handleCategoryChange = (event) => {
      setLeaveCategory(event.target.value); // Update state when user selects a category
    };
    return (
        <div className='leave-container'>
            <div className='leave-compo'>
                <div className='leave-heading'>Create request for leave</div>
                <div className='leave-date-container'>
                    <div className='leave-date'>
                        <div className='leave-date-title'>From Date*</div>
                        <DatePicker
                        selected={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        dateFormat="MM/dd/yyyy"
                        className='date-picker leave-date-picker'
                        />
                        <div className='first-second-container'>
                            <button onClick={() => setfromDateToggle(!fromDateToggle)} className={`first-second-btn ${fromDateToggle? 'first-half' : 'second-half'}`}>First Half</button>
                            <button onClick={() => setfromDateToggle(!fromDateToggle)} className={`first-second-btn ${fromDateToggle? 'second-half' : 'first-half'}`}>Second Half</button>
                        </div>
                    </div>
                    <div className='leave-date'>
                        <div className='leave-date-title'>To Date*</div>
                        <DatePicker
                        selected={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        dateFormat="MM/dd/yyyy"
                        className='date-picker leave-date-picker'
                        />
                        <div className='first-second-container'>
                            <button onClick={() => setToDateToggle(!toDateToggle)} className={`first-second-btn ${toDateToggle? 'first-half' : 'second-half'}`}>First Half</button>
                            <button onClick={() => setToDateToggle(!toDateToggle)} className={`first-second-btn ${toDateToggle? 'second-half' : 'first-half'}`}>Second Half</button>
                        </div>
                    </div>
            </div>
            <div className='total-days-cat-container'>
                <div className='mb-2'>Total Days*</div>
                <div className='total-days-category-container'>
                    <input type="number" className='leave-total-days' placeholder='Enter Number of Days'/>
                    <select 
                        id="leave-category" 
                        className='leave-dropdown' 
                        value={leaveCategory} 
                        onChange={handleCategoryChange}
                    >
                        <option value="" disabled>Select leave category</option>
                        <option value="Annual Leave/Vacation">Annual Leave/Vacation</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Compensatory Leave">Compensatory Leave</option>
                        <option value="Sabbatical Leave">Sabbatical Leave</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Unpaid Leave">Unpaid Leave</option>
                    </select>
                </div>
            </div>
            <div className='leave-note-container'>
                <div className='my-3'>Notes*</div>
                <textarea
                    id="leave-note"
                    className='leave-note-textarea'
                    value={leaveNote}
                    onChange={handleNoteChange}
                    placeholder="Enter any additional notes or reasons for the leave..."
                />
            </div>
        </div>
    </div>
  )
}

export default Requestleave