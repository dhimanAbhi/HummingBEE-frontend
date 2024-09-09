import React, { useState, useEffect } from 'react';
import '../styles/hrLeaveAndAttendance.css';
import { apiUrl } from '../api';
import axios from 'axios';
import { useAuth } from '../utils/auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function HRLeavesAndAttendance() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [userData, setUserData] = useState([]);
  const [searchDate, setSearchDate] = useState(new Date());
  const [curDept, setcurDept] = useState("AllDepts.");
  const [curStatus, setcurStatus] = useState("All");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [curDate, setCurDate] = useState(new Date());
  const [tableRows, setTableRows] = useState([]);
  const [tabelRawData, setTabelRawData] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const auth = useAuth();
  
  const handleCurDateChange = (date) => {
    setCurDate(date);
  }
  
  const handleDateChange = (date) => {
    setSearchDate(date);
  };
  
  const attendanceStatus = (userData) => {
    const param = {
      totalEmployee: 0,
      onTime: 0,
      absent: 0,
      lateArrival: 0,
      earlyDeparture: 0,
    };
  
    userData.forEach((user) => {
      param.totalEmployee++;
  
      const today = new Date();
      const todayDate = today.toDateString();
  
      const todayRecord = user.checkInOutHistory.find((record) => {
        const checkInDate = new Date(record.checkIn).toDateString();
        return checkInDate === todayDate;
      });
  
      if (!todayRecord || !todayRecord.checkIn) {
        param.absent++;
      } else {
        const checkInTime = new Date(todayRecord.checkIn);
        const checkOutTime = todayRecord.checkOut ? new Date(todayRecord.checkOut) : null;
  
        const onTimeLimit = new Date(today.setHours(9, 0, 0)); // 09:00 AM
        const earlyDepartureLimit = new Date(today.setHours(17, 0, 0)); // 05:00 PM
  
        if (checkInTime <= onTimeLimit) {
          param.onTime++;
        } else {
          param.lateArrival++;
        }
        if (checkOutTime && checkOutTime < earlyDepartureLimit) {
          param.earlyDeparture++;
        }
      }
    });
  
    setUserData(param);
  };
  
  const handleDeptChange = (e) => {
    setcurDept(e.target.value); // Update state based on selected value
  };
  
  const generateTimeOptions = () => {
    const options = [];
    const start = new Date();
    start.setHours(0, 0, 0, 0); // Start at 12:00 AM
  
    for (let i = 0; i < 24 * 60; i += 15) {
      const time = new Date(start.getTime() + i * 60 * 1000);
      const timeString = time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      options.push(timeString);
    }
    return options;
  };
  
  // Get the generated options
  const timeOptions = generateTimeOptions();
  
  // Parse ISO 8601 timestamps into Date objects
  const parseTimeString = (timeString) => {
    return new Date(timeString);
  };
  
  // Function to calculate work hours
  const calculateWorkHours = (checkInTime, checkOutTime) => {
    const checkInDate = parseTimeString(checkInTime);
    const checkOutDate = parseTimeString(checkOutTime);
    const difference = Math.abs(checkOutDate - checkInDate);
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };
  
  const processUserData = (tabelRawData) => {
    const filteredRows = tabelRawData.filter((user) => {
      // Filter by department
      if (curDept !== "AllDepts." && user.team !== curDept) {
        return false;
      }
  
      // Filter by name
      if (nameSearch && !user.name.toLowerCase().includes(nameSearch.toLowerCase())) {
        return false;
      }
  
      // Find today's check-in and check-out record in checkInOutHistory
      const todayRecord = user.checkInOutHistory.find((record) => {
        const recordDate = new Date(record.checkIn); // checkIn contains the date
        return recordDate.toDateString() === curDate.toDateString();
      });
  
      // If no record for today, the employee is absent
      if (!todayRecord || !todayRecord.checkIn) {
        return true; // Keep the user as they are absent
      }
  
      // If checkIn filter is set, check if user's checkIn time matches
      if (checkIn && parseTimeString(todayRecord.checkIn).getTime() < parseTimeString(checkIn).getTime()) {
        return false;
      }
  
      // If checkOut filter is set, check if user's checkOut time matches
      if (checkOut && todayRecord.checkOut && parseTimeString(todayRecord.checkOut).getTime() > parseTimeString(checkOut).getTime()) {
        return false;
      }
  
      return true;
    }).map((user) => {
      // Find today's record
      const todayRecord = user.checkInOutHistory.find((record) => {
        const recordDate = new Date(record.checkIn);
        return recordDate.toDateString() === curDate.toDateString();
      });
  
      // Default status
      let status = "On Time";
  
      // Check status based on checkIn and checkOut times
      if (!todayRecord || !todayRecord.checkIn) {
        status = "Absent";
      } else if (parseTimeString(todayRecord.checkIn).getTime() > parseTimeString("09:00 AM").getTime()) {
        status = "Late Arrival";
      }
  
      if (todayRecord && todayRecord.checkOut && parseTimeString(todayRecord.checkOut).getTime() < parseTimeString("06:00 PM").getTime()) {
        status = "Early Departure";
      }
  
      // Calculate work hours if both checkIn and checkOut exist
      const workHours = todayRecord?.checkIn && todayRecord?.checkOut
        ? calculateWorkHours(todayRecord.checkIn, todayRecord.checkOut)
        : "N/A";
  
      // Format time for display
      const formatTime = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      };
  
      return {
        id: user._id,
        empName: user.name,
        dept: user.team,
        date: curDate.toDateString(),
        status: status,
        checkIn: formatTime(todayRecord?.checkIn),
        checkOut: formatTime(todayRecord?.checkOut),
        workHours,
      };
    });
  
    setTableRows(filteredRows);
  };
  
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
  
      // Time formatting
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      const timeString = `${now.getHours() % 12 || 12}:${now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()}:${now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds()} ${ampm}`;
      setCurrentTime(timeString);
  
      // Date formatting
      const day = now.toLocaleDateString('en-US', { weekday: 'long' });
      const month = now.toLocaleDateString('en-US', { month: 'long' });
      const dayNumber = now.getDate();
      const year = now.getFullYear();
      const dateString = `${dayNumber}th ${month} ${year}`;
      setCurrentDate(dateString);
    };
  
    const fetchUserData = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`,
          },
        };
  
        const { data } = await axios.get(`${apiUrl}/getUserData`, config);
        if (data) {
          attendanceStatus(data.data);
          setTabelRawData(data.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
  
    const intervalId = setInterval(updateTime, 1000);
    updateTime();
    fetchUserData();
  
    return () => clearInterval(intervalId);
  }, [auth.token]);
  
  // New effect to process table data
  useEffect(() => {
    if (tabelRawData.length > 0) {
      processUserData(tabelRawData);
    }
  }, [tabelRawData, checkIn, checkOut, curDate, curDept, nameSearch]);
  
  return (
    <div className='attendance-leave-container'>
      <div className='attendance-upper-container'>
        <div className='attendance-date-time'>
          <div className='attendance-time'>
            <img src='../images/attendance-time.svg' alt='attendance-time' />
            <div className='attendance-time-compo'>
              <div className='attendance-time-view'>{currentTime}</div>
              <div className='attendance-time-insight'>Realtime Insight</div>
            </div>
          </div>
          <div className='attendance-date'>
            <div className='attendance-today'>Today</div>
            <div className='attendance-date-view'>{currentDate}</div> 
          </div>
          <div>
            <button className='view-attendance'>View Attendance</button>
          </div>
        </div>
        <div className='attendance-status'>
          <div className='attendance-employee-stats'>
            <div className='attendance-employee-content'>
              <div className='attendance-employee-number'>{userData.totalEmployee}</div>
              <div className='attendance-employee-label'>Total Employee</div>
            </div>
            <div>
              <img src="../images/total-employee.svg" className='attendance-employee-img'/>
            </div>
          </div>

          <div className='attendance-employee-stats'>
            <div className='attendance-employee-content'>
              <div className='attendance-employee-number'>{userData.onTime}</div>
              <div className='attendance-employee-label'>On Time</div>
            </div>
            <div>
              <img src="../images/total-employee.svg" className='attendance-employee-img'/>
            </div>
          </div>

          <div className='attendance-employee-stats'>
            <div className='attendance-employee-content'>
              <div className='attendance-employee-number'>{userData.absent}</div>
              <div className='attendance-employee-label'>Absent</div>
            </div>
            <div>
              <img src="../images/total-employee.svg" className='attendance-employee-img'/>
            </div>
          </div>

          <div className='attendance-employee-stats'>
            <div className='attendance-employee-content'>
              <div className='attendance-employee-number'>{userData.lateArrival}</div>
              <div className='attendance-employee-label'>Late Arrival</div>
            </div>
            <div>
              <img src="../images/total-employee.svg" className='attendance-employee-img'/>
            </div>
          </div>

          <div className='attendance-employee-stats'>
            <div className='attendance-employee-content'>
              <div className='attendance-employee-number'>{userData.earlyDeparture}</div>
              <div className='attendance-employee-label'>Early Departure</div>
            </div>
            <div>
              <img src="../images/total-employee.svg" className='attendance-employee-img'/>
            </div>
          </div>

          <div className='attendance-employee-stats'>
            <div className='attendance-employee-content'>
              <div className='attendance-employee-number'>1</div>
              <div className='attendance-employee-label'>time-off</div>
            </div>
            <div>
              <img src="../images/total-employee.svg" className='attendance-employee-img'/>
            </div>
          </div>
        </div>
      </div>
      
      <div className='attendance-overview'>
        <div className='search-bar-container'>
          <div className='attendance-search-heading'>Attendance Overview</div>
          <input
            type="text"
            className='search-bar-attendance'
            placeholder='Quick Search'
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
          />
          <DatePicker
              selected={curDate}
              onChange={handleCurDateChange}
              dateFormat="MM/dd/yyyy"
              className='date-picker attendance-table-date'
            />
            <button className='view-attendance-btn'>
              <img src="../images/view-attendance.svg" className='view-attendance-img'/>
              View Attendance
            </button>
        </div>
        <div className='attendance-table'>
          <div className='row attendance-table-header'>
            <div className='attendance-employee-id  col-2'>ID</div>
            <div className='attendance-employee-name col-1'>Employee</div>
            {/* <div className='col-2'>Role</div> */}
            <div className="attendance-employee-dept col-1">
              <select 
                id="department-select" 
                value={curDept} 
                onChange={handleDeptChange} 
                className="attendance-table-dropdowns"
              >
                <option value="AllDepts." className='dept-select-opt'>All Departments</option>
                <option value="Development" className='dept-select-opt'>Development</option>
                <option value="Design" className='dept-select-opt'>Design</option>
                <option value="Management" className='dept-select-opt'>Management</option>
                <option value="Team" className='dept-select-opt'>Team</option>
              </select>
            </div>            
            <div className='attendance-employee-date col-1'>
              Date
            </div>
            <div className='attendance-employee-status col-1'>Status</div>
            <div className='attendance-employee-checkIn d-flex flex-column align-items-start col-1'>
              <select
                id='checkin-select'
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className='attendance-table-dropdowns check-time'
              >
                <option value="" disabled>Select Check In</option> {/* Placeholder */}
                {timeOptions.map((time, index) => (
                  <option className='dept-select-opt' key={index} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div className='attendance-employee-checkOut d-flex flex-column align-items-start col-1'>
              <select
                id='checkout-select'
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className='attendance-table-dropdowns check-time'
              >
                <option value="" disabled>Select Check Out</option> {/* Placeholder */}
                {timeOptions.map((time, index) => (
                  <option className='dept-select-opt' key={index} value={time}>{time}</option>
                ))}
              </select>
            </div>    
            <div className='attendance-employee-workHours col-1'>Work Hours</div>
          </div>
          <div className='attendance-table-rows'>
              {tableRows.map((row) => (
              <div key={row.id} className='attendance-table-row row'>
              <div className='attendance-employee-id col-2'>{row.id.substring(0, 10)}</div>
              <div className='attendance-employee-name col-1'>{row.empName}</div>
              <div className='attendance-employee-dept col-1'>{row.dept}</div>
              <div className='attendance-employee-date col-1'>{row.date}</div>
              <div className='attendance-employee-status col-1'>{row.status}</div>
              <div className='attendance-employee-checkIn col-1'>{row.checkIn}</div>
              <div className='attendance-employee-checkOut col-1'>{row.checkOut}</div>
              <div className='attendance-employee-workHours col-1'>{row.workHours}</div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HRLeavesAndAttendance;
