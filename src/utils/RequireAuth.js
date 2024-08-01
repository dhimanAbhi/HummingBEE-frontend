import { useAuth } from './auth'
import {Navigate, useLocation} from "react-router-dom"

export const  RequireAuth = ({children}) => {
    const auth = useAuth()
    const location = useLocation()
    if(!auth.loggedUser){
        return <Navigate to='/login' state={{ path: location.pathname}}/>
    }
  return children
}

