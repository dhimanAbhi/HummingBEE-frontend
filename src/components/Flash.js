import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_MESSAGE } from '../constants/actionTypes'
import '../styles/flash.css'
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
function Flash() {
    const dispatch = useDispatch()
    const flash = useSelector(state => state.flash)

    const updateFlash = () => {
        dispatch({type:RESET_MESSAGE, payload:null})
    }
    console.log(flash)
    useEffect(() => {
        
    },[dispatch])
  return (
    // <div style={{backgroundColor:"#9A0000"}} className='d-flex align-items-center justify-content-center'>
    <div className={`${flash.type?'sticky':null}`}>
        {
            flash.type?
                <div class={`alert flash-${(flash.type === 'success')?'success':'error'} alert-dismissible m-0 fade show flash`} role="alert">
                    <div>{flash.message}</div>
                    <button type="button" onClick={() => updateFlash()} class="btn-close flash-btn" data-bs-dismiss="alert"  aria-label="Close"><Close/></button>
                </div>
                :null
        }

    </div>    
    // </div>
  )
}

const Close = styled(CloseIcon)`
    color:white;
    height:100%;
`

export default Flash