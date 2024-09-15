import React, { useState } from 'react';
import '../styles/engagement.css';
import '../styles/toolkit.css';

function Engagement() {
    const [resourceId, setResourceId] = useState([
        "JOB RESOURCE",
        "LOREM IPSUM", 
        "LOREM IPSUM", 
        "LOREM IPSUM", 
        "LOREM IPSUM", 
    ]);

    const [selected, setSelected] = useState(5); // Default selection
    const [currentResource, setCurrentResource] = useState(0)
    const [value, setValue] = useState({ "one":50, "two":50, "three":50});

    const handleChange = (event) => {
        setSelected(parseInt(event.target.value));
    };


        const handleBarChange = (val, key) => {
            setValue({...value, [key]: val});
        };
 
    return (
        <div className='toolkit-container'>
            <div className='toolkit-title'>What is Engagement?</div>
            <div className='tookit-title-content'>
                Engagement in the workplace context refers to the emotional commitment and connection employees have to their work, their organization, and its goals. It's a measure of how enthusiastic, involved, and dedicated employees are in their roles and to their company.
            </div>

            <div className='toolkit-improve-ask'>
                <div className='toolkit-improve-ask-question'>Would you like to improve?</div>
                <div className='tookit-yes-no'>
                    <button className='toolkit-yes toolkit-yes-no-btn'>Yes</button>
                    <button className='toolkit-no toolkit-yes-no-btn'>No</button>
                </div>
            </div>

            <div className='engagement-container'>
                <div className='engagement-improve'>
                    <div className='engagement-improve-title'>Here are 5 ways to improve engagement</div>
                    <div className='engagement-improve-resources'>
                        {resourceId.map((resource, index) => (
                            <div className='engagement-improve-resource' key={index}>
                                <div className={` eng-impr-res-no ${index === currentResource? 'eng-impr-res-no-ticked': ''} `}>{index + 1}</div>
                                <div className={` eng-impr-res-box ${index === currentResource? 'eng-impr-res-box-ticked':''}  `}>
                                    <div>{resource}</div>
                                    <div className={`todo-status eng-tick`}>
                                        <input
                                            type="checkbox"
                                            id={`check-${index}`}
                                            className='check-tick'
                                            checked={index === currentResource}
                                            onChange={() => setCurrentResource(index)}
                                        />
                                        <label
                                            htmlFor={`check-${index}`}
                                            className={`check-tick-label ${index === currentResource? 'en-impr-res-box-ticked' : 'check-tick-label-bg'}`}
                                        ></label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='engagement-improve-resources-container'>
                    <div className='eng-impr-ress-title'>JOB RESOURCES</div>
                    <div className='eng-impr-ress-content'>
                        Engagement in the workplace context refers to the emotional commitment and connection employees have to their work, their organization, and its goals. It's a measure of how enthusiastic, involved, and dedicated employees are in their roles and to their company.
                    </div>
                    <div className='eng-impr-ress-box'>
                        <div className='eng-impr-ress-box-content'>
                            <div className='eng-impr-ress-box-first'>Lorem Ipsum</div>
                            <div className='eng-impr-ress-box-second'>Dummy text here/ bullet points</div>
                            <div className='eng-impr-ress-box-third'>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={value["one"]} 
                                    className="slider" 
                                    onChange={(e) => handleBarChange(e.target.value, "one")} 
                                    style={{ background: `linear-gradient(to right, #008080 ${value["one"]}%, #d3d3d3 ${value["one"]}%)` }}
                                />
                            </div>
                        </div>
                        <div className='eng-impr-ress-box-content'>
                            <div className='eng-impr-ress-box-first'>Lorem Ipsum</div>
                            <div className='eng-impr-ress-box-second'>Dummy text here/ bullet points</div>
                            <div className='eng-impr-ress-box-third'>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={value["two"]} 
                                    className="slider" 
                                    onChange={(e) => handleBarChange(e.target.value, "two")} 
                                    style={{ background: `linear-gradient(to right, #008080 ${value["two"]}%, #d3d3d3 ${value["two"]}%)` }}
                                />
                            </div>
                        </div>
                        <div className='eng-impr-ress-box-content'>
                            <div className='eng-impr-ress-box-first'>Lorem Ipsum</div>
                            <div className='eng-impr-ress-box-second'>Dummy text here/ bullet points</div>
                            <div className='eng-impr-ress-box-third'>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={value["three"]} 
                                    className="slider" 
                                    onChange={(e) => handleBarChange(e.target.value, "three")} 
                                    style={{ background: `linear-gradient(to right, #008080 ${value["three"]}%, #d3d3d3 ${value["three"]}%)` }}
                                />
                            </div>
                        </div>
                       {/* <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={value["one"]} 
                          className="slider" 
                          onChange={(e) => handleBarChange(e.target.value, "one")} 
                          style={{ background: `linear-gradient(to right, #008080 ${value["one"]}%, #d3d3d3 ${value["one"]}%)` }}
                      />
                    */}


                    </div>
                </div>
            </div>

            <div className='improve-feedback'>
                <div className='improve-feedback-title'>On a scale of 1 to 10, how much have you improved?</div>
                <div className='improve-feedback-radio-container'>
                    <div className="eng-impr-ress-radio-group">
                        {Array(10).fill(0).map((_, index) => {
                            const value = index + 1;
                            return (
                                <div className="eng-impr-ress-tick" key={value}>
                                    <input
                                        type="radio"
                                        id={`option${value}`}
                                        name="options"
                                        value={value}
                                        checked={selected === value}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={`option${value}`}>{value}</label>
                                </div>
                            );
                        })}
                    </div>
                    <div className="eng-feedback-ask">
                        <div className='eng-feedback-ask-met'>Not at all</div>
                        <div className='eng-feedback-ask-met'>Average</div>
                        <div className='eng-feedback-ask-met'>Excellent</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Engagement;
