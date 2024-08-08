import React, {useState, useEffect} from 'react'
import { useParams, useLocation } from 'react-router-dom'
import CircularProgress from './CircularProgress ';
import { useAuth } from '../utils/auth';
import "../styles/graphs.css"
import Calendar from './Calendar';
import { apiUrl } from '../api';
import { Spinner } from './Spinner';
import axios from 'axios';
import Todo from './Todo';

function Graphs() { 


    const [graphData, setGraphData] = useState([{}])

    const auth = useAuth();
    const [value, setValue] = useState(50);

    const [activeBox, setActiveBox] = useState(null);

    

  const boxes = [
    { label: 'HIGH', description: 'BURNOUT' },
    { label: 'TOO MUCH', description: 'OVERLOAD' },
    { label: 'MODERATE', description: 'MANAGEABLE' },
    { label: 'OPTIMUM', description: 'GOOD SPOT' },
    { label: 'LOW', description: 'UNDERLOAD' },
  ];

  const handleClick = (index) => {
    setActiveBox(index);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
};



  const [tasks, setTasks] = useState([
    { id: 1, date: '06 JULY', priority: 'MEDIUM', task: 'DESIGN A CARROUSEL, SM', completed: false },
    { id: 2, date: '14 JULY', priority: 'LOW', task: 'ADVERTISEMENT DESIGN FOR INSTAGRAM', completed: false },
    { id: 3, date: '28 JULY', priority: 'HIGH', task: 'DESIGN SOCIAL MEDIA POST', completed: false },
  ]);

  const handleCheckboxChange = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const userId = auth.loggedUser._id;

  
  useEffect(() => {
    const getScores = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`, // Adjust authorization as needed
                },
            };
            
            const { data } = await axios.get(`${apiUrl}/scores/${userId}`, config);
            if (data) {
                console.log(data.data[0].data);

                setGraphData(data.data[0].data);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    getScores();
}, [userId, auth.token]); 
  

  return ( 
    <div className='graphs'>
      <div className='graph-header'>
        <div className='graph-heading'>Hi {auth.loggedUser.name}!  <img style={{height:"55px", width:"55px", margin:"0 0 15px 0"}} src="../images/hand.png" /></div>
        <div className='graph-heading-para'>We're thrilled to see you again. Dive into your personalized dashboard to explore your recent <b>achievements, upcoming goal</b> and <b>insigts into your engagement and well-being.</b>Let's continue to grow and succeed together!</div>
      </div>
      <div className='graph-info'>
        <div className='graph-info-upper'>
          <div className='mood'>
              <div className='mood-ask'>
                <div className='mood-ask-para'>
                  <div className='mood-ask-title'>How are you doing</div>
                  <div className='mood-ask-moodometer'>mood-o-meter</div>
                </div>
              </div>
              <div className="slider-container">
                    <div className="emojis">
                        <div className="emoji">😔</div>
                        <div className="emoji">🙂</div>
                        <div className="emoji">😃</div>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={value} 
                        className="slider" 
                        onChange={handleChange} 
                        style={{ background: `linear-gradient(to right, #008080 ${value}%, #d3d3d3 ${value}%)` }}
                    />
                </div>
          </div>
          <div className='mental'>
              <div className='mental-ask' style={{marginRight:"5px !important"}}>
                <div className='mental-ask-para'>
                  <div className='mental-ask-title'>How is your mental health</div>
                  <div className='mental-ask-moodometer'>strees-o-meter</div>
                </div>
              </div>
              <div className="box-grid">
                    {boxes.map((box, index) => (
                      <div
                        key={index}
                        className={`box ${activeBox === index ? 'active' : ''}`}
                        onClick={() => handleClick(index)}
                      >
                        <div className="label">{box.label}</div>
                        <div className="description">{box.description}</div>
                      </div>
                    ))}
                </div>
          </div>
        </div>
        <div className='graph-info-lower'>
          <div className='paras-and-todo'>
            <div className='para'>
                    <div className='graph-container'>
                      {
                        graphData.length?
                          graphData.map((item, index) => {
                            return <>
                            <div className='circle-container'>
                              <CircularProgress radius={70} stroke={10} progress={item.value*10} number={item.value}  parameter={item.parameter}/>
                            </div>
                            </>
                          }): <Spinner />
                      }
                      </div>
            </div>
            <div className='todo'>
              <Todo />
            </div>
          </div>
          <div className='calendar'>
            {/*<Calendar />*/}
            <a  href="https://calendar.google.com" target="_blank" rel="noopener noreferrer">
              <img className='calendar-img' src='../images/google-calendar.svg' />
            </a>
            <a className='' href="https://slack.com/intl/en-in" target="_blank" rel="noopener noreferrer">
              <img className='slack-img' src='../images/slack.svg' />
            </a>
          </div>
        </div>
      <div>

      </div>
      </div>
        
         
    </div>
  )
}



export default Graphs

// <div className="todo-list">
//                 <h1>To do List</h1>
//                 <div className="header">
//                   <span className="header-date">DUE DATE</span>
//                   <span>PRIORITY</span>
//                   <span>TASK</span>
//                   <span>STATUS</span>
//                 </div>
//                 {tasks.map(task => (
//                   <div key={task.id} className="task-row">
//                     <span className="task-date">{task.date}</span>
//                     <span className={`task-priority ${task.completed ? 'completed' : ''}`}>{task.priority}</span>
//                     <span className={`task-name ${task.completed ? 'completed' : ''}`}>{task.task}</span>
//                     <div className={`task-status ${task.completed ? 'completed' : ''}`}>
//                       <input 
//                         type="checkbox" 
//                         checked={task.completed} 
//                         onChange={() => handleCheckboxChange(task.id)} 
//                       />
//                     </div>
//                 </div>
//               ))}
//             </div>