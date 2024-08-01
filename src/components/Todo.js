import React, {useState} from 'react'
import '../styles/todo.css'

function Todo() {


    const [ticked, setTicked] = useState({
        "check-0": 0,
        "check-1":0,
        "check-2":0
    })

    const handlecheck = (e) => {
        const val = !ticked[e.target.id];
        setTicked({...ticked, [e.target.id]: val})
    }

  return (
    <div className='todo-container'>
        <div className='todo-heading'>
            <div className='todo-heading-1'>To do List</div>
            <div className='todo-heading-2'>
                <input type='checkbox' /> THIS MONTH THIS MONTH
            </div>
        </div>
        <div className='todo-list'>
            <div className='todo-list-header'>
                <div className='todo-cells todo-date'> DUE DATE</div>
                <div className='todo-cells todo-priority'> PRIORITY</div>
                <div className='todo-cells todo-task'> TASK</div>
                <div className='todo-status'> STATUS</div>
            </div>
            <div className='todo-list-row'>
                <div className='todo-cells todo-date'> 06 JULY</div>
                <div className={`todo-cells todo-priority  ${ticked['check-0']?' check-ticked-bg ':''}    `}> <img className='priority-img' src='../images/blue-icon.png'/> MEDIUM </div>
                <div className={`todo-cells todo-task  ${ticked['check-0']?' check-ticked-bg ':''}    `}>DESIGN A CARROUSEL, SM </div>
                <div className={`todo-status  ${ticked['check-0']?' check-ticked-bg ':''}    `}>
                    <input type="checkbox" id="check-0" className='check-tick' onClick={handlecheck}/>
                    <label for="check-0" className='check-tick-label'></label>  
                </div>
            </div>
            <div className='todo-list-row'>
                <div className='todo-cells todo-date'> 14 JULY</div>
                <div className={`todo-cells todo-priority  ${ticked['check-1']?' check-ticked-bg ':''}    `}><img className='priority-img' src='../images/yellow-icon.png'/>LOW </div>
                <div className={`todo-cells todo-task  ${ticked['check-1']?' check-ticked-bg ':''}    `}> ADVERTISEMENT DESIGN FOR INSTAGRAM </div>
                <div className={`todo-status  ${ticked['check-1']?' check-ticked-bg ':''}    `}> 
                    <input type="checkbox" id="check-1" className='check-tick' onClick={handlecheck}/>
                    <label for="check-1" className='check-tick-label'></label>  
                </div>
            </div>
            <div className='todo-list-row'>
                <div className='todo-cells todo-date'> 28 JULY</div>
                <div className={`todo-cells todo-priority  ${ticked['check-2']?' check-ticked-bg ':''}    `}><img className='priority-img' src='../images/red-icon.png'/>HIGH </div>
                <div className={`todo-cells todo-task  ${ticked['check-2']?' check-ticked-bg ':''}    `}> DESIGN SOCIAL MEDIA POST</div>
                <div className={` todo-cells todo-status  ${ticked['check-2']?' check-ticked-bg ':''}    `}>
                    <input type="checkbox" id="check-2" className='check-tick' onClick={handlecheck}/>
                    <label for="check-2" className='check-tick-label'></label>  
                </div>
            </div>
        </div>
    </div>
  )
}

export default Todo