import React, {useState} from 'react'
import "../styles/radio.css"

function RadioGroup({index, para, onSelect, selectedValue}) {

    const handleChange = (e) => {
        const value = e.target.value;
        onSelect(index, value);
    };
 

  return (
      <div>
        <div class="radio-group">
        {  
          [...Array(10).keys()].map((ind) => {
            return (
              <>
                <input 
                  type="radio" 
                  id={`radio${ind+1}${index}`} 
                  name={`rating${index}`} 
                  value={`${ind+1}`} 
                  onChange={handleChange}  
                  checked={selectedValue === `${ind+1}`}
                />
                <label for={`radio${ind+1}${index}`}>{`${ind+1}`}</label>
              </>
            )
          })
        }

      </div>    
    </div>
  )
}

export default RadioGroup


{/* <input type="radio" id={`radio1${index}`} name={`rating-${index}`} value="1" onChange={handleChange} />
        <label for={`radio1${index}`}>1</label>

        <input type="radio" id={`radio2${index}`} name={`rating-${index}`} value="2" onChange={handleChange} />
        <label for={`radio2${index}`}>2</label>

        <input type="radio" id={`radio3${index}`} name={`rating-${index}`} value="3" onChange={handleChange} />
        <label for={`radio3${index}`}>3</label>

        <input type="radio" id={`radio4${index}`} name={`rating-${index}`} value="4" onChange={handleChange} />
        <label for={`radio4${index}`}>4</label>

        <input type="radio" id={`radio5${index}`} name={`rating-${index}`} value="5" onChange={handleChange} />
        <label for={`radio5${index}`}>5</label>

        <input type="radio" id={`radio6${index}`} name={`rating-${index}`} value="6" onChange={handleChange} />
        <label for={`radio6${index}`}>6</label>

        <input type="radio" id={`radio7${index}`} name={`rating-${index}`} value="7" onChange={handleChange} />
        <label for={`radio7${index}`}>7</label>

        <input type="radio" id={`radio8${index}`} name={`rating-${index}`} value="8"  onChange={handleChange} />
        <label for={`radio8${index}`}>8</label>

        <input type="radio" id={`radio9${index}`} name={`rating-${index}`} value="9" onChange={handleChange} />
        <label for={`radio9${index}`}>9</label>

        <input type="radio" id={`radio10${index}`} name={`rating-${index}`} value="10" onChange={handleChange} />
        <label for={`radio10${index}`}>10</label>
    </div> */}