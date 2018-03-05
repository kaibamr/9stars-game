import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Game from './components/game';
import registerServiceWorker from './registerServiceWorker';

const App = () => {
    return (
        <div>
            <Game />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
