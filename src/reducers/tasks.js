import { COMPLETE_TASK, CREATE_TASK, DELETE_TASK, GET_TASKS } from '../constants/actionTypes';

export default (tasks = [], action) => {
    switch(action.type) {
        case GET_TASKS: {
            console.log("tasks: ", action.payload);
            return action.payload;
        }
     
        case CREATE_TASK: {
            console.log(action.payload);
            return [...tasks, action.payload];  
        }

        case COMPLETE_TASK:
            return tasks.map((task) => 
                task._id === action.payload._id ? action.payload : task
            );  

        case DELETE_TASK:
            return tasks.filter((task) => task._id !== action.payload);      

        default:
            return tasks;
    }
};
