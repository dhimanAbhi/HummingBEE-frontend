import {CREATE_TASK,
    DELETE_TASK,
    GET_TASKS,
FLASH_SUCCESS,
FLASH_ERROR
} from '../constants/actionTypes'
import axios from 'axios';
import { apiUrl } from '../api';

 
const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    }
};

const configtwo = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  };

export const getTasks = (index) => async(dispatch) =>  {
    try{
        const {data} = await axios.get(`${apiUrl}/tasks/${index}`, config)
        dispatch({type: GET_TASKS, payload: data})
    }
    catch(err){
        console.log(err.message)
    }
}




export const createTask = (taskData) => async (dispatch) => {
    try{
        const configtwo = {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          };
        const {data} = await axios.post(`${apiUrl}/tasks/createTask`, taskData, configtwo)
        
        if(data.type === "success"){
            console.log("success")
            dispatch({type: CREATE_TASK, payload: data})
            dispatch({type:FLASH_SUCCESS, payload:data.message})
        }
        else{
            console.log("error", data.message)
            dispatch({type:FLASH_ERROR, payload:data.message})
        }
    }
    catch(err){
        dispatch({type:FLASH_ERROR, payload:err.message})
    }
}




export const deleteTask = (task) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${apiUrl}/tasks/deleteTask`, {task}, config);
    
        if (data.type === "success") {
            dispatch({ type: DELETE_TASK, payload: task._id });
            dispatch({ type: FLASH_SUCCESS, payload: data.message });
        } else {
            dispatch({ type: FLASH_ERROR, payload: data.message });
        }
    } catch (err) {
        dispatch({ type: FLASH_ERROR, payload: err.message });
    }
}
