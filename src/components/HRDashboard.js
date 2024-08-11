import React from 'react'
import { useAuth } from '../utils/auth';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { apiUrl } from '../api';
import '../styles/hrdashboard.css'
import WaterLevelCircle from './WaterLevelCircle';
function HRDashboard() {

    const auth = useAuth();
    const userId = auth.loggedUser._id;

    const [curDept, setCurDept] = useState('AllDepts.')
    const [scoresData, setScoresData] = useState([])
    const [circleData, setCircleData] = useState({})
    const [curMonth, setCurMonth] = useState(new Date().toLocaleString('default', { month: 'long' }))

    const handleChange = (e) => {
        const currentDept = e.target.value;
        setCurDept(e.target.value);
        setCircleScore(currentDept, scoresData)
    }

    const setCircleScore = (currentDept, allScoresData) => {
        let params = { 'positivity': 0, 'engagement':0, 'relationship':0, 'meaning':0}
        let count=0;
        allScoresData.forEach((score) => {
            if(currentDept=='AllDepts.'){
                count++;
                score.data.forEach(data => {
                    let result = params[data.parameter] + data.value;
                    params = {...params, [data.parameter]: result}  
                })
            }
            else if(score.user.team == currentDept){
                count++;
                score.data.forEach(data => {
                    let result = params[data.parameter] + data.value;
                    params = {...params, [data.parameter]: result}  
                })
            }
        })
        
        Object.keys(params).forEach(key => {
            params[key] = (params[key] / count).toFixed(1);
          });
        setCircleData(params)
        
    }


    const handleLineGraphChange = (e) => {
        setCurMonth(e.target.value)
    }

    useEffect(() => {
        const getAvgScores = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.token}`, // Adjust authorization as needed
                    },
                };
                
                const { data } = await axios.get(`${apiUrl}/avgscores`, config);
                if (data) {
                    setScoresData(data.data)
                    setCircleScore('AllDepts.', data.data)
                }
            } catch (err) {
                console.log(err.message);
            }
        };
    
        getAvgScores();
    }, [userId, auth.token]); 


  return (
    <div className='dashboard-container'>
        <div className='dashboard-heading'>
            HR DASHBOARD
        </div>
        <div className='first-section'>
            <div className='scores-section'>
                <div className='scores-subheading'>
                    Unlock Your Workforce Potential: insights for a Thriving Organization
                </div>
                <div className='dept-select-container'>
                    <div>Explore insights Aross Your Organization</div>
                    <select onChange={handleChange} placeholder="All Depts." value={curDept} name='dept' className='dept-select' id="dept">
                        <option value="AllDepts.">All Depts.</option>
                        <option value="Development">Development</option>
                        <option value="Management">Management</option>
                        <option value="Design">Design</option>
                        <option value="Team">Team</option>
                    </select>
                </div>   
                <div className='parameter-container'>
                    {
                        circleData && Object.keys(circleData).map((circle) => {
                            return <div className='parameter-circle'>
                                        <WaterLevelCircle value={circleData[circle]} />
                                        <div>{circle.charAt(0).toUpperCase() + circle.slice(1)}</div>
                                    </div>
                        })
                    }
                    
                </div>
            </div>
            <div className='dominant-parameter'>

            </div>
        </div>
        <div className='second-section'>
            <div className='score-line-graph'>
                <div className='d-flex justify-content-between'>
                    <div>Overall Average</div>
                    <select onChange={handleLineGraphChange} className='month-dropdown' value={curMonth}>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                    {/* <div className="custom-arrow">▼</div> */}
                </div>
            </div>
            <div className='score-bar-graph'>

            </div>
        </div>


    </div>
  )
}

export default HRDashboard