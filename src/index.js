import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';
import Stars from './components/stars';

class App extends Component {
    render() {
        return (
            <div>
                <Game />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));