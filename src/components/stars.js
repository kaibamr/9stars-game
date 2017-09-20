import React from 'react';
import FontAwesome from 'react-fontawesome';
const Stars = (props) => {

    return (
        <div className="col-5">
          {_.range(props.numberOfStars).map(i =>
            <i key={i} className="fa fa-star"></i>
          )}
         
          </div>
    );
}

export default Stars;