import React from 'react';

const doneFrame = (props) => {
    return (
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <button className="btn btn-secondary" onClick={props.restartGame}>Play Again</button>
        </div>
    );
};

export default doneFrame;