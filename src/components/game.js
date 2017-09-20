import React, { Component } from 'react';
import Stars from './stars';
import Answer from './answer';
import Button from './button';
import Numbers from './numbers';
import DoneFrame from './doneFrame';
class Game extends Component {

    possibleCombinationSum = (arr, n) => {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return this.possibleCombinationSum(arr, n);
    }
   let listSize = arr.length, combinationsCount = (1 << listSize)
    for (let i = 1; i < combinationsCount ; i++ ) {
        let combinationSum = 0;
        for (let j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
    };    
    
    static randomNumber = () => 1 + Math.floor(Math.random()*9);
    static initialState = () => ({
        selectedNumbers: [],
        usedNumbers: [],
        numberOfStars: Game.randomNumber(),
        answerCorrect: null,
        redraws: 5,
        doneStatus: null,
    });

    state = Game.initialState();
    restartGame = () =>  this.setState(Game.initialState());
    
    checkAnswer = () => {
        this.setState(prevState => ({
            answerCorrect: prevState.selectedNumbers.reduce((acc, n) => acc + n, 0) === prevState.numberOfStars
        }));
    };

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerCorrect: null,
            numberOfStars: Game.randomNumber()
        }), this.updateDoneStatus);
    };

    selectNumber = (clickedNumber) => {
        if(this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return;}
        if(this.state.usedNumbers.indexOf(clickedNumber) >= 0) { return;}
        this.setState(prevState => ({
            answerCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };

    unSelectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
        }));
    };

    redraw = () => {
        if(this.state.redraws === 0) { return; }
        this.setState(prevState => ({
            numberOfStars: Game.randomNumber(),
            answerCorrect: null,
            selectedNumbers: [],   
            redraws: prevState.redraws - 1,
        }), this.updateDoneStatus);
    };

    possibleSolutions = ({numberOfStars, usedNumbers}) => {
        const possibleNumbers = _.range(1,10).filter(number =>
            usedNumbers.indexOf(number) === -1
        );
        return this.possibleCombinationSum(possibleNumbers, numberOfStars);
    };


    updateDoneStatus = () => {
        this.setState(prevState =>{
            if(prevState.usedNumbers.length === 9) {
                return { doneStatus: 'Done!'};
            }
            if(prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return { doneStatus: 'Game Over!'};
            }
        });
    };

    render () {
        return (
            
            <div className="container">
                <h3>Nine Stars Game</h3>
                <hr />
                <div className="row">

                    <Stars numberOfStars={this.state.numberOfStars} />
                    <Button selectedNumbersProp={this.state.selectedNumbers} 
                            checkAnswer={this.checkAnswer}
                            answerCorrect={this.state.answerCorrect}
                            acceptAnswer={this.acceptAnswer}
                            redraw={this.redraw}
                            redraws={this.state.redraws}
                    />
                    <Answer selectedNumbersProp={this.state.selectedNumbers}
                            unSelectSomeNumber={this.unSelectNumber}
                    />
                </div>
                <br />
                {this.state.doneStatus ?
                 <DoneFrame restartGame={this.restartGame} doneStatus={this.state.doneStatus} />:
                 <Numbers selectSomeNumber={this.selectNumber}          
                         selectedNumbersProp={this.state.selectedNumbers}
                         usedNumbersProp={this.state.usedNumbers} />
                }
               
            </div>
        );
    }
}

export default Game;