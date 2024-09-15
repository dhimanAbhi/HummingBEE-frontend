import React from 'react'
import "../styles/leaveview.css"
import Person from '@mui/icons-material/Person';
import { useAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../api';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { FLASH_SUCCESS, FLASH_ERROR } from '../constants/actionTypes';
import styled from 'styled-components';
import { useState } from 'react';
import DateTime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import DatePicker from 'react-datepicker';


function LeaveView() {


    const [approved, setApproved] = useState(false)
    const [leaveDate, setLeaveDate] = useState(new Date());
  
    const handleLeaveDateChange = (date) => {
        setLeaveDate(date);
    }
  
//     const navigate = useNavigate()
//     const auth = useAuth()
//     const userId = auth.loggedUser._id;
//     const dispatch = useDispatch()

//     const handleLogout = async () => {
//       const config = {
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         };
  
//       const {data} = await axios.post(`${apiUrl}/logout`, config)
      
//       if(data.type === 'success')
//       auth.logOut()
  
//       if(data.type === "success"){
//           dispatch({type:FLASH_SUCCESS, payload:data.message})
//       }
//       else
//           dispatch({type:FLASH_ERROR, payload:data.message})
  
//       navigate('/', {replace: true})
//   }


  return (
    <div className='leave-view-container'>
        {/* <div class="hr-heading" style={{margin:"50px 0", padding:"0 100px"}}>
            <div className='hr-heading-container' style={{margin:0}}>
            <div class="hr-icon">HummingBEE</div>
                <div class="lines">
                <div class="hr-line"></div>
                <div class="hr-line"></div>
                <div class="hr-line"></div>
                <div class="hr-line"></div>
                <div class="hr-line"></div>
                </div>
                <a  className="ms-3 heading-hr-logout"><PersonIconI /></a>
            </div>
        </div> */}
        <div className='leave-view-header'>
            <div className='leave-view-heading'>Hi Arjuna <img style={{height:"45px", width:"45px", margin:"15px 0 0px 10px"}} src="../images/hand.png" /></div>
            <div className='leave-view-para'>We're thrilled to see you again. Dive into your personalized dashboard to explore your recent achievements, upcoming goal and insigts into your engagement and well-being. Let's continue to grow and succeed together!</div>
        </div>
        <div className='leave-view-upper-container'>
            <div className='leave-view-user'>
                <div className='leave-view-user-heading'>
                    Leave Request
                </div>
                <div className='leave-user-content'>
                    <div className='leave-user-row'>
                        <div className='leave-user-key'>
                            Name
                        </div>
                        <div className='leave-user-value'>
                            Srishti Singh
                        </div>
                    </div>
                    <div className='leave-user-row'>
                        <div className='leave-user-key'>
                            Start Date
                        </div>
                        <div className='leave-user-value'>
                            27-Aug-2024
                        </div>
                    </div>
                    <div className='leave-user-row'>
                        <div className='leave-user-key'>
                            End Date
                        </div>
                        <div className='leave-user-value'>
                            27-Aug-2024
                        </div>
                    </div>
                    <div className='leave-user-row'>
                        <div className='leave-user-key'>
                            Reason
                        </div>
                        <div className='leave-user-value'>
                            I have to go out for an emergency, due to which I won't be available today
                        </div>
                    </div>
                    <div className='leave-user-row'>
                        <div className='leave-user-key'>
                            Day
                        </div>
                        <div className='leave-user-value'>
                            01
                        </div>
                    </div>
                    <div className='leave-user-row'>
                        <div className='leave-user-key'>
                            Half Leave Time
                        </div>
                        <div className='leave-user-value'>
                            -
                        </div>
                    </div>
                    <div className='leave-user-row'>
                        <div className='leave-user-key'>
                            Status
                        </div>
                        <div className='leave-user-value'>
                            <button onClick={() => setApproved(!approved)} className={`approve-btn ${approved ? 'approved' : 'approve'}`}>
                                {approved && <img src="../images/tick.svg" className='tick' />} {/* Conditional rendering of the image */}
                                {approved ? 'Approved' : 'Approve'} {/* Text logic simplified */}
                            </button>
                        </div>
                    </div>
                
                </div>
            </div>
            <div  className='leave-users'>
                <div className='leave-view-user-heading'>
                    Who's On Leave
                </div>
                <div className='leave-user-content leave-request-content'>
                    <div className='leave-user-row leave-request-row'>
                        <div className='leave-user-key'>
                            On Leave: 2
                        </div>
                        <div className='leave-user-value leave-request-value'>
                            <DatePicker
                                selected={leaveDate}
                                onChange={handleLeaveDateChange}
                                dateFormat="MM/dd/yyyy"
                                className='date-picker leave-date'
                            />
                        </div>
                    </div>
                    <div className='leave-user-row leave-request-row'>
                        <div className='leave-user-key'>
                            Dev Khatri
                        </div>
                        <div className='leave-user-value leave-request-value'>
                            Sep 08 - Casual Leave
                        </div>

                </div>
                <div className='leave-user-row leave-request-row'>
                    <div className='leave-user-key'>
                        Srishti Singh
                    </div>
                    <div className='leave-user-value leave-request-value'>
                        Sep 08 - Half Leave
                    </div>

                </div>
                </div>


            </div>
        </div>
        <div className='leave-requests'>
            <div className='leave-requests-heading'>
                Leave Request
            </div>
            <div className='leave-requests-content'>
                <div className='leave-requests-row'>
                    <div className='leave-requests-duration'>Duration</div>
                    <div className='leave-requests-name'>Name</div>
                    <div className='leave-requests-types'>Types</div>
                    <div className='leave-requests-days'>Days</div>
                    <div className='leave-requests-status'>Status</div>
                </div>
                <div className='leave-requests-row'>
                    <div className='leave-requests-duration'>Sep 05-06</div>
                    <div className='leave-requests-name'>Shivang Chauhan</div>
                    <div className='leave-requests-types'>Sick Leave</div>
                    <div className='leave-requests-days'>01</div>
                    <div className='leave-requests-status'><button className='leave-approval'>Pending <img src="../images/leave-approval.svg"/></button></div>
                </div>
                <div className='leave-requests-row'>
                    <div className='leave-requests-duration'>Sep 05-06</div>
                    <div className='leave-requests-name'>Abhishek Dhiman</div>
                    <div className='leave-requests-types'>Casual Leave</div>
                    <div className='leave-requests-days'>02</div>
                    <div className='leave-requests-status'><button className='leave-approval'>Pending <img src="../images/leave-approval.svg"/></button></div>
                </div>
            </div>

        </div>
    </div>
  )
}

const PersonIconI = styled(Person)`
    transform:scale(1.5);
    color: #008080;
    margin-top:5px;
    transition: 0.2s all;

    :hover{
    color: white;
    cursor:pointer;
    }
`

export default LeaveView