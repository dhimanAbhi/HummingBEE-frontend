import { CREATE_USER,
    FETCH_ALL_USER
 } from "../constants/actionTypes";


export default (users = [], action) => {
    switch(action.type){
        case FETCH_ALL_USER:
            return action.payload;  

        case CREATE_USER:
            return [...users, action.payload];   

        default:
            return users;
    }
}