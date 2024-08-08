import React, { useEffect, useState } from 'react';
import '../styles/todo.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createTask, getTasks } from '../actions/todo';
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../utils/auth';
import { parseISO, format } from 'date-fns';
import { deleteTask } from '../actions/todo';
import { completeTask } from '../actions/todo';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';

function Todo() {
  const auth = useAuth()

  const [startDate, setStartDate] = useState(new Date());
  
  const [eventVal, setEventVal] = useState({
    date: new Date(),
    priority: '',
    task: '',
    completed:'false',
    author:auth.loggedUser._id
  });
  


  const format = (s) => {
    const date = new Date(s);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  };
  

  const dispatch = useDispatch()
  const handleDateChange = (date) => {
    setStartDate(date);
    setEventVal({ ...eventVal, date });
  };


  const handleChange = (e) => {
    if (e instanceof Date && !isNaN(e)) {
      setEventVal({ ...eventVal, date: e });
    } else {
      const { name, value } = e.target;
      setEventVal({ ...eventVal, [name]: value });
    }
  };


  const tasks = useSelector((state) => state.tasks)


  const formattedDate = (dateString) =>{
      const date = parseISO(dateString);  
      return format(date, 'd MMMM');    
  }   

    // const handleCheck = (e) => {
    //     const val = !ticked[e.target.id];
    //     setTicked({ ...ticked, [e.target.id]: val });
    // };

  


    const handleAddTask = () =>{
        dispatch(createTask(eventVal))

    }



    useEffect(() => {
        dispatch(getTasks(auth.loggedUser._id))
    }, [dispatch])

  return (
    <div className='todo-container'>
      <div className='todo-heading'>
        <div className='todo-heading-1'>To do List</div>
        <div className='todo-heading-2'>THIS MONTH THIS MONTH</div>
      </div>
      <div className='todo-list'>
        <div className='todo-list-header'>
          <div className='todo-cells todo-date'>DUE DATE</div>
          <div className='todo-cells todo-priority'>PRIORITY</div>
          <div className='todo-cells todo-task'>TASK</div>
          <div className='todo-status'>STATUS</div>
          <div className='todo-delete'>DELETE</div>
        </div> 

        <div className='todo-list-rows'>
        {
          tasks && tasks.slice().reverse().map((task) => {
            return (
                <div className='todo-list-row' key={task.id}>
                  <div className='todo-cells todo-date'>{format(task.date)}</div>
                  <div className={`todo-cells todo-priority`}>
                    {/* <img className='priority-img' src={`../images/${task.priority}-icon.png`} alt={`${task.priority} Priority`} /> */}
                    <img className='priority-img' src={`../images/High-icon.png`} alt={`${task.priority} Priority`} />
                    {task.priority}
                  </div>
                  <div className={`todo-cells todo-task ${task.completed?'strikethrough':''}`}>
                    {task.task}
                  </div>
                  <div className={`todo-status `}> 
                    <input type="checkbox" id={`check-${task._id}`} className='check-tick' checked={task.completed}  onClick={() =>   dispatch(completeTask(task))} />
                    <label htmlFor={`check-${task._id}`} className='check-tick-label'></label>
                  </div>
                  <div className='todo-delete'>
                    {/* <button type="button" id="todo-delete" onClick={() => dispatch(deleteTask(task))} className='todo-delete-btn'>Delete</button> */}
                    <Delete onClick={() => dispatch(deleteTask(task))}/>
                  </div>
                </div>
              );
            })
          }

        </div>
        <div className='todo-list-row mt-2'>
          <div className='pick-date'>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              className='date-picker'
            />
          </div>
          <img className='priority-img' src={`../images/High-icon.png`} />

          <select onChange={handleChange} placeholder="Priority" value={eventVal.priority} name='priority' className='pick-priority' id="priority">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input type="text" onChange={handleChange} value={eventVal.task} name='task' id='task' className='pick-task' />
          <button className='add-task' onClick={handleAddTask}>Add</button>
        </div>

      </div>
    </div>
  );
}

const Delete = styled(DeleteIcon)`
  color: red;
  transform: scale(1.3);

  :hover{
    color: white;
    cursor: pointer;
  }
`

export default Todo;
