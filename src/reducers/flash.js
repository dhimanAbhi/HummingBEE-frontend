import {FLASH_SUCCESS, FLASH_ERROR, RESET_MESSAGE} from '../constants/actionTypes'


export default (flash = {message:'', type:null}, action) => {
    switch(action.type){
        case FLASH_SUCCESS:
            return {message:action.payload, type:'success'}; 
            
        case FLASH_ERROR:    
            return {message:action.payload, type:'error'}; 

        case RESET_MESSAGE:
            return {message:'', type:null}; 
    
        default:
            return flash;
    }
}