import React , {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import RadioGroup from './RadioGroup'
import "../styles/survey.css"
import { surveys } from '../data/questions'
import axios from 'axios';
import { apiUrl } from '../api';
import { useDispatch } from 'react-redux';
import { FLASH_ERROR, FLASH_SUCCESS } from '../constants/actionTypes';
import { useAuth } from '../utils/auth';
function Survey() {
 
    const [page, setPage] = useState(0)
    const [count, setCount] = useState(0)
    const [flag, setflag] = useState(false)
    const [nextFlag, setNextFlag] = useState(true)
    const [submitFlag, setSubmitFlag] = useState(false)
    const [selectedValues, setSelectedValues] = useState({positivity: {}, engagement: {}, relationship: {}, meaning: {}}); 
    const [graphData, setGraphData] = useState({positivity: 0, engagement: 0, relationship: 0, meaning: 0})
    

    const [activeStep, setActiveStep] = useState(0);

    const handleStepClick = (index) => {
        setActiveStep(index);
    };

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useAuth()
    let paraObj={};

    Object.keys(surveys).forEach((key, index) => {
        paraObj[index] = key;
    })


    const handleRadioSelection = (index, value) => {
    const currentPageData = { ...selectedValues[paraObj[page]], [index]: Number(value) };

    setSelectedValues(prevSelectedValues => {
        const updatedSelectedValues = { ...prevSelectedValues, [paraObj[page]]: currentPageData };
        const newCount = Object.keys(updatedSelectedValues[paraObj[page]]).length;
        setCount(newCount);
        return updatedSelectedValues;
    });
    }

    const handleNextPage = () => {
        const step = page;
        setPage(page+1)
        setNextFlag(true)
        setActiveStep(page+1)
    }

    const handleSubmit= async (e) => {
        e.preventDefault();
        let newGraphData = {...graphData};
        Object.keys(selectedValues).forEach(para => {
            let val = 0;
            let length = 0;
            Object.keys(selectedValues[para]).forEach(curVal => {
                val += selectedValues[para][curVal];
                length++;
            });
            newGraphData[para] = Number((val/length).toFixed(1));
        });
        const dataTemp = 
        {
            data:newGraphData,
            author: auth.loggedUser._id,
            date: new Date(),
        }
        setGraphData(newGraphData); 
        submitScore(dataTemp)
    }

    const submitScore = async (scores) => {
        try{
            const configtwo = {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                },
              };
            const {data} = await axios.post(`${apiUrl}/scores`, scores, configtwo)
                
            if(data.type === "success"){
                console.log("success")
                dispatch({type:FLASH_SUCCESS, payload:data.message})
                navigate('/takeSurvey/graphs')
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
    
    useEffect(()=>{
        console.log(page, activeStep)
        // if(flag) navigate('/takeSurvey/graphs', {state: {myData: graphData}})
        // else{
            if( page == 3){
                setSubmitFlag(true)
             }
             else if(count == Object.keys(surveys[paraObj[page]]).length ){
                 setNextFlag(false)
                 setCount(0)
            //  }
        }
        
    },[graphData, page, count, selectedValues])

    return (
        <div className='survey'>
            <div className='survey-progress'>
                <div className='survey-progress-heading'>
                    Survey Questions
                </div>
                <div className='survey-progress-content'>
                    Your feedback is invaluable in helping us create a better workplace for everyone. By answering these questions, you provide insights that guide improvements in our work enviornment. enhance employee satisfaction, and foster a more supportive and engaging company culture.
                </div>
                
                <div className='progress-bar-container'>
                    <div className="progress-bar">
                        {[0, 1, 2, 3].map((step, index) => (
                            <div
                                key={index}
                                className={`progress-step ${index <= activeStep ? 'completed' : ''}`}
                            />
                        ))}
                    </div>
                    <div className='progress-bar-para-container'>
                        {[0, 1, 2, 3].map((step, index) => (
                            <div className={`${index<=page?"progress-bar-para-info-checked":"progress-bar-para-info"}`}>{paraObj[index]}</div>
                        ))}
                    </div>
                </div>
                


            </div>
            <div className='survey-container' >
                <form onSubmit={handleSubmit}>
                    {
                        surveys[paraObj[page]].map((ques, index)=>{
                        return( 
                            
                                <div className='question-container'>
                                    <div className='questions'>
                                        <div style={{fontSize:"32px", fontWeight:"600"}}>{index+1}</div> <div style={{fontSize:"20px"}}>{ques}</div>
                                    </div>
                                    <div className='rating-div'>
                                        <RadioGroup 
                                            index={index} 
                                            para={paraObj[page]} 
                                            onSelect={handleRadioSelection} 
                                            selectedValue={selectedValues[paraObj[page]]?.[index]?.toString() || ''} 
                                        />
                                    </div>
                                    <div className='rating-names'>  
                                        <div>Never</div>
                                        <div>Sometimes</div>
                                        <div>Always</div>
                                    </div>
                                </div>
                                
                        )
                        })
                    }
                    <div className='d-flex jusitfy-content-start'>   
                        {
                            submitFlag?
                                <button className={`submit-btn ms-3  ${count==surveys[paraObj[page]].length?"":"submit-btn-disabled"}`} type="submit" disabled={count==surveys[paraObj[page]].length?false:true}>Submit</button>:
                                <button type='button' className={`submit-btn me-3 ${nextFlag? "submit-btn-disabled ":""}`} onClick={handleNextPage} disabled={nextFlag}>Next</button>                    
                        }

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Survey
