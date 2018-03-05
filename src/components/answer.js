import React from 'react';

const Answer = (props) => {
    return (
        <div className="col-5">
            {props.selectedNumbersProp.map((number, i) => 
                <span key={i}
                      onClick={() => props.unSelectSomeNumber(number)}>
                    {number}
                </span>
            )}
        </div>
    );
}

export default Answer;