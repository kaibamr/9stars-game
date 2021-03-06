import React from 'react';
import _ from 'lodash';

const Numbers = (props) => {
    
    const numberClassName = (number) => {
        if (props.usedNumbersProp.indexOf(number) >= 0) {
            return 'used';
        }        
        if (props.selectedNumbersProp.indexOf(number) >= 0) {
            return 'selected';
        }
    }

    return(
        <div className="card text-center">
         <div>
            {Numbers.list.map((number, i) => 
              <span key={i} 
                    className={numberClassName(number)}
                    onClick={() => props.selectSomeNumber(number)}>
               {number}
              </span>          
            )}
         </div>
        </div>
    );
}

Numbers.list = _.range(1 ,10);

export default Numbers;