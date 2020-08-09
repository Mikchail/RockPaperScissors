import React, { useState, useEffect } from 'react';
import Rock from './icons/Rock';
import Paper from './icons/Paper';
import Scissors from './icons/Scissors';
import './App.css';


const choices = [
  { id: 1, name: 'Rock', component: Rock, losserTo: 2 },
  { id: 2, name: 'Paper', component: Paper, losserTo: 3 },
  { id: 3, name: 'Scissors', component: Scissors, losserTo: 1 }
];

export default function App() {
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [gameState, setGameState] = useState(null); //win lose draw


  useEffect(() => {
    resetGame();
  }, [])

  function handleUserChoice(choise) {
    const choosenChoice = choices.find(c => c.id === choise);
    setUserChoice(choosenChoice);

    if (choosenChoice.losserTo === computerChoice.id) {
      setGameState('lose')
      setLosses(losses => losses + 1);
    } else if (computerChoice.losserTo === choosenChoice.id) {
      setGameState('win')
      setWins(wins => wins + 1);

    } else if (choosenChoice.id === computerChoice.id) {
      setGameState('draw')
    }
  }

  function resetGame(){
    setGameState(null);
    setUserChoice(null);
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(randomChoice);
  }
  function renderIcon(choise) {
    const Component = choise.component
    return (
      <Component />
    )
  }

  return (
    <div className="app">
      {/* information goes here */}
      <div className="info">
        <h2>Rock. Paper. Scissors</h2>

        {/* wins vs losses stats */}
        <div className="wins-losses">
          <div className="wins">
            <span className="number">{wins}</span>
            <span className="text">{wins === 1 ? 'Win' : 'Wins'}</span>
          </div>

          <div className="losses">
            <span className="number">{losses}</span>
            <span className="text">{losses === 1 ? 'loss' : 'losses'}</span>
          </div>
        </div>
      </div>

      {/* the popup to show win/loss/draw */}
      {gameState && <div className={`game-state ${gameState}`} onClick={resetGame}>
        <div>
          <div className="game-state-content">
            <p>{renderIcon(userChoice)}</p>
            <p>{`You ${gameState}`}</p>
            <p>{renderIcon(computerChoice)}</p>
          </div>
          <button >Play Again</button>
        </div>
      </div>
      }
      <div className="choices">
        {/* choices captions */}
        <div>You</div>
        <div />
        <div>Computer</div>

        {/* buttons for my choice */}
        <div>
          <button className="rock" onClick={() => handleUserChoice(1)}>
            <Rock />
          </button>
          <button className="paper" onClick={() => handleUserChoice(2)}>
            <Paper />
          </button>
          <button className="scissors" onClick={() => handleUserChoice(3)}>
            <Scissors />
          </button>
        </div>

        <div className="vs">vs</div>

        {/* show the computer's choice */}
        <div>
          <button className="computer-choice">?</button>
        </div>
      </div>
    </div>
  );
}
