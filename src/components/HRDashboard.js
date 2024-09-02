import React from 'react'
import { useAuth } from '../utils/auth';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { apiUrl } from '../api';
import '../styles/hrdashboard.css'
import WaterLevelCircle from './WaterLevelCircle';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import CircleComponent from './CircleComponent';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import Person from '@mui/icons-material/Person';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { FLASH_SUCCESS, FLASH_ERROR } from '../constants/actionTypes';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function HRDashboard() {


    const auth = useAuth();
    const userId = auth.loggedUser._id;

    const [curDept, setCurDept] = useState('AllDepts.')
    const [scoresData, setScoresData] = useState([])
    const [moodData, setMoodData] = useState([])
    const [circleData, setCircleData] = useState({})
    const [curLineMonth, setLineCurMonth] = useState(new Date().toLocaleString('default', { month: 'long' }))
    const [curBarMonth, setBarCurMonth] = useState(new Date().toLocaleString('default', { month: 'long' }))
    const [curStressMonth, setCurStressMonth] = useState(new Date())
    const [lineChartData, setLineChartData] = useState([])
    const [barGraphData, setBarGraphData] = useState([])
    const [moodParams, setMoodParams] = useState({ data:{'LOW': 0,'MODERATE': 0,'OPTIMUM': 0,'HIGH': 0,'TOO MUCH': 0}, userCount:0 })

    const [circlessqrData, setcirclessqrData] = useState([
        { radius: 7, param: 'positivity', color: '#028A0F', left: '20%', top: '10%' },
        { radius: 4, param:'engagement', color: '#B0FC38', left: '60%', top: '10%' },
        { radius: 5, param:'relationship' ,color: '#3A5311', left: '20%', top: '50%' },
        { radius: 3, param:'meaning',color: '#3DED97', left: '60%', top: '50%' },
      ])


      const dispatch = useDispatch()
      const navigate = useNavigate()



    const handleChange = (e) => {
        const currentDept = e.target.value;
        setCurDept(currentDept);
        setCircleScore(currentDept, scoresData);
        setLineGraph(curLineMonth, currentDept, scoresData);
        setBarData(curBarMonth, currentDept, scoresData);
        setStressDistrubtion(curStressMonth, currentDept);  // Ensure this is called with correct values
    }

    const getWeekOfMonth = (dateString) => {
      const date = new Date(dateString);
      const dayOfMonth = date.getDate();
      const weekOfMonth = Math.ceil(dayOfMonth / 7);
      return weekOfMonth > 4 ? 4 : weekOfMonth;

    }

    const handleStressChange = (date) => {
        setCurStressMonth(date);
        setStressDistrubtion(date, curDept)
    }

    const stressColors = ['#C271FE', '#FCFF66', '#2BC702', '#FF7304', '#FF020D']
    
    const setStressDistrubtion = (currentDate, currentDept) => {
        const params = {
            'LOW': 0,
            'MODERATE': 0,
            'OPTIMUM': 0,
            'HIGH': 0,
            'TOO MUCH': 0
        };
    
        const distinctUsers = new Set();
    
        moodData.forEach(record => {
            const recordDate = new Date(record.date);
    
            const isSameDate = recordDate.getDate() === currentDate.getDate() &&
                               recordDate.getMonth() === currentDate.getMonth() &&
                               recordDate.getFullYear() === currentDate.getFullYear();
    
            // Determine if the department check should be applied
            const isSameDept = currentDept === 'All Depts.' || record.user.team === currentDept;
    
            if (isSameDate && isSameDept) {
                const moodCategory = record.data.toUpperCase();  // Ensure the moodCategory is in uppercase
    
                if (params[moodCategory] !== undefined) {
                    params[moodCategory]++;
                } else {
                    console.warn(`Unexpected moodCategory: ${moodCategory}`);
                }
    
                distinctUsers.add(record.user.email);
            }
        });
    
        const distinctUserCount = distinctUsers.size;
        console.log("Params:", params);  // Debugging: Check the values in params
        console.log("Distinct User Count:", distinctUserCount);  // Debugging: Check the count of distinct users
    
        setMoodParams({ data: params, userCount: distinctUserCount });
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
        let sqrcircleDat = circlessqrData;

        Object.keys(params).forEach((param) => {
            sqrcircleDat.forEach((val) => {
                if(val.param == param){
                    val.radius = 1.9*Number(params[param])
                }
            })
        })
        console.log("heyyyyy",sqrcircleDat)
    }


    const handleLineGraphChange = (e) => {
        const currentMonth= e.target.value;
        setLineCurMonth(e.target.value);
        setLineGraph(currentMonth, curDept,scoresData)
    }

    const setLineGraph = (currentMonth, currentDept,allScoresData) => {
        let params = [
            {
                weekName:"",
                value:0
            },
            {
                weekName:"Week 1",
                value:0
            },
            {
                weekName:"Week 2",
                value:0
            },
            {
                weekName:"Week 3",
                value:0
            },
            {
                weekName:"Week 4",
                value:0
            },
            {
                weekName:"",
                value:0
            }
        ]
        let newScore=[]

        allScoresData.forEach((score) => {
            const dateObject = new Date(score.date);
            const monthString = dateObject.toLocaleString('en-US', { month: 'long' });
            
            if(currentDept == 'AllDepts.' && monthString === currentMonth){
                newScore.push(score)
            }
            else if(score.user.team == currentDept && monthString === currentMonth){
                newScore.push(score)
            }
           

        })
        let weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

        weeks.forEach(week => {
            let sum=0
            let count=0
            newScore.forEach((score) => {
                
                if(`Week ${getWeekOfMonth(score.date)}` == week){
                    
                    score.data.forEach((val) => {
                        sum+=val.value;
                        count++
                    })
                }
            })
            sum = Number((sum/count).toFixed(1))
            for (let i = 0; i < params.length; i++) {
                if (params[i].weekName === week) {
                    if (isNaN(sum)) {
                        sum = 0;
                    }
                    params[i].value = sum;
                    break; // Stop the loop once the weekName is found and updated
                }
            }
        });
        
        
        setLineChartData(params)
        console.log("wooo: ",params)
    }

    const handleBarGraphChange = (e) => {
        const currentMonth= e.target.value;
        setBarCurMonth(e.target.value);
        setBarData(currentMonth, curDept,scoresData)
    }
    const setBarData = (currentMonth, currentDept, allScoresData) => {
        let params = [
            {
                weekName: "Week 1",
                lowest: 0,
                median: 0,
                highest: 0
            },
            {
                weekName: "Week 2",
                lowest: 0,
                median: 0,
                highest: 0
            },
            {
                weekName: "Week 3",
                lowest: 0,
                median: 0,
                highest: 0
            },
            {
                weekName: "Week 4",
                lowest: 0,
                median: 0,
                highest: 0
            },
        ];
    
        let newScore = [];
    
        // Filter scores based on currentDept and currentMonth
        allScoresData.forEach((score) => {
            const dateObject = new Date(score.date);
            const monthString = dateObject.toLocaleString('en-US', { month: 'long' });
    
            if (currentDept === 'AllDepts.' && monthString === currentMonth) {
                newScore.push(score);
            } else if (score.user.team === currentDept && monthString === currentMonth) {
                newScore.push(score);
            }
        });
    
        let weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
    
        weeks.forEach(week => {
            let weeklyScores = [];
    
            // Collect all scores for the given week
            newScore.forEach((score) => {
                if (`Week ${getWeekOfMonth(score.date)}` === week) {
                    let totalParamsAverage = 0;
                    score.data.forEach((val) => {
                        totalParamsAverage += val.value;
                    });
                    const avgScore = Number((totalParamsAverage / score.data.length).toFixed(1));
                    weeklyScores.push(avgScore);
                }
            });
    
            if (weeklyScores.length > 0) {
                // Calculate lowest, highest, and median
                const lowest = Math.min(...weeklyScores);
                const highest = Math.max(...weeklyScores);
                const median = Number((weeklyScores.reduce((acc, curr) => acc + curr, 0) / weeklyScores.length).toFixed(1));
    
                // Update params for the given week
                for (let i = 0; i < params.length; i++) {
                    if (params[i].weekName === week) {
                        params[i].lowest = lowest;
                        params[i].median = median;
                        params[i].highest = highest;
                        break; // Stop the loop once the weekName is found and updated
                    }
                }
            }
        });
    
        // Set the bar graph data with the updated params
        setBarGraphData(params);
        console.log("Bar Data: ", params);
    };
    

    const handleLogout = async () => {
        const config = {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          };

        const {data} = await axios.post(`${apiUrl}/logout`, config)
        
        if(data.type === 'success')
        auth.logOut()

        if(data.type === "success"){
            dispatch({type:FLASH_SUCCESS, payload:data.message})
        }
        else
            dispatch({type:FLASH_ERROR, payload:data.message})

        navigate('/', {replace: true})
    }
 

    const handleCircleSqrGraph = () => {

    }

    useEffect(() => {
        const getAvgScores = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.token}`,
                    },
                };
                
                const { data } = await axios.get(`${apiUrl}/avgscores`, config);
                if (data) {
                    setScoresData(data.data);
                    setCircleScore('AllDepts.', data.data);
                    setBarData(new Date().toLocaleString('default', { month: 'long' }), 'AllDepts.', data.data); // Added this to initialize bar chart data
                    console.log(data.data);
                }
            } catch (err) {
                console.log(err.message);
            }
        };
        
        const getStress = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.token}`,
                    },
                };
                
                const { data } = await axios.get(`${apiUrl}/getMood`, config);
                if (data) {
                    setMoodData(data.data)
                }
            } catch (err) {
                console.log(err.message);
            }
        }
        getStress()
        getAvgScores();
    }, [userId, auth.token]);
    
    useEffect(() => {
        if (scoresData.length > 0) {
            const month = new Date().toLocaleString('default', { month: 'long' });
            setLineGraph(month, 'AllDepts.', scoresData);
            setBarData(month, 'AllDepts.', scoresData); // Ensure bar chart data is updated when scoresData changes
        }
    }, [scoresData]); // Trigger this effect whenever scoresData is updated
    

  return (
    <div className='dashboard-container'>
        <div class="hr-heading">
            <div className='hr-heading-container'>
            <div class="hr-icon">HummingBEE</div>
                <div class="lines">
                <div class="hr-line"></div>
                <div class="hr-line"></div>
                <div class="hr-line"></div>
                <div class="hr-line"></div>
                <div class="hr-line"></div>
                </div>
                <a onClick={handleLogout} className="ms-3 heading-hr-logout"><PersonIconI /></a>
            </div>
        </div>
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
                {/* <div className='parameter-container'>
                    {
                        circleData && Object.keys(circleData).map((circle) => {
                            return <div className='parameter-circle'>
                                        {circle == 'engagement' ? 
                                        <Link to='/toolkit' style={{textDecoration:"none", color:"white"}}>
                                            <WaterLevelCircle value={circleData[circle]} />
                                            <div style={{marginTop:"24px"}}>{circle.charAt(0).toUpperCase() + circle.slice(1)}</div>
                                        </Link> : 
                                            <>
                                                <WaterLevelCircle value={circleData[circle]} />
                                                <div style={{marginTop:"24px"}}>{circle.charAt(0).toUpperCase() + circle.slice(1)}</div>
                                            </>
                                        }                                        
                                    </div>
                        })
                    }
                    
                </div>  */}
            </div>
           
        </div>
        <div className='mid-section'>
            <div className='stress-distribution'>
                <div className='d-flex justify-content-between'>
                    <div className='graphHeading'>Daily Stress Distribution</div>
                    <DatePicker
                    selected={curStressMonth}
                    onChange={handleStressChange}
                    dateFormat="MM/dd/yyyy"
                    className='date-picker'
                    />
                </div>
                <div className='stress-params'>
                    {Object.keys(moodParams.data).map((mood, index) => (
                        <div key={index} className='stress-item'>
                            <div className='stress-num'>{moodParams.data[mood]}</div>
                            <div className='stress-param'><div className='stress-param-circle' style={{backgroundColor:stressColors[index]}}/>{mood}</div>
                        </div>
                    ))}
                </div>
                <div>
                    Number of Employee {moodParams.userCount}
                </div>
            </div>
            <div className='dominant-parameter'>
                <div className='dominant-parameter-container'>
                    <div className='dom-param-title'>
                        <div className='dom-param'>Dominant Parameter</div>
                    </div>
                    <CircleComponent circles={circlessqrData} />
                    {/* <div className='dom-param-legend'>
                        <div>
                            <div><div className='dom-circle-param' style={{backgroundColor:'#028A0F'}}/> Positivity</div>
                            <div><div className='dom-circle-param' style={{backgroundColor:'#B0FC38'}}/> Engagement</div>
                        </div>
                        <div>
                            <div><div className='dom-circle-param' style={{backgroundColor:'#3A5311'}}/> Relationship</div>
                            <div><div className='dom-circle-param' style={{backgroundColor:'#3DED97'}}/> Meaning</div>

                        </div>
                    </div> */}
                </div>
            </div>
        </div>
        <div className='second-section'>
            <div className='score-line-graph'>
                <div className='d-flex justify-content-between'>
                    <div className='graphHeading'>Overall Average</div>
                    <select onChange={handleLineGraphChange} className='month-dropdown' value={curLineMonth}>
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
               <div className='line-graph-container'>
               <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={lineChartData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="weekName" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#008080" fill="#008080" />
                    </AreaChart>
                </ResponsiveContainer>
                </div>
            </div>
            <div className='bar-graph'>       
                <div className='d-flex justify-content-between'>
                    <div className='graphHeading'>Highest, lowest & median performances</div>
                    <select onChange={handleBarGraphChange} className='month-dropdown' value={curBarMonth}>
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
                </div>
                <div className='bar-graph-container'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={barGraphData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="weekName" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="lowest" stackId="a" fill="#008080" />
                        <Bar dataKey="median" stackId="a" fill="#a4a4a4" />
                        <Bar dataKey="highest" stackId="a" fill="#00e1e1" />
                        </BarChart>
                    </ResponsiveContainer>
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

export default HRDashboard