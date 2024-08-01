import {CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    FETCH_ALL_USER,
FLASH_SUCCESS,
FLASH_ERROR} from '../constants/actionTypes'
import axios from 'axios';
import { apiUrl } from '../api';

const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  };

export const getUsers = () => async(dispatch) =>  {
    try{
        const {data} = await axios.get(`${apiUrl}/users/getUsers`, config)
        dispatch({type: FETCH_ALL_USER, payload: data})
    }
    catch(err){
        dispatch({type:FLASH_ERROR, payload:err.message})
    }
}


