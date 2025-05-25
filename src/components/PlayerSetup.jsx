import React, { useState } from 'react';
import { EMOJI_CATEGORIES } from '../utils/constants.js'; 
import '../App.css'; 

const PlayerSetup = ({ onStartGame }) => {
  const [player1Category, setPlayer1Category] = useState(Object.keys(EMOJI_CATEGORIES)[0]);
  const [player2Category, setPlayer2Category] = useState(Object.keys(EMOJI_CATEGORIES)[1] || Object.keys(EMOJI_CATEGORIES)[0]);

  const handleStart = () => {
    onStartGame(player1Category, player2Category);
  };

  return (
    <div className="player-setup">
      <h2>Choose Your Emojis!</h2>
      <div>
        <label htmlFor="player1-category">Player 1 (starts): </label>
        <select
          id="player1-category"
          value={player1Category}
          onChange={(e) => setPlayer1Category(e.target.value)}
        >
          {Object.keys(EMOJI_CATEGORIES).map(category => (
            <option key={category} value={category}>
              {category} ({EMOJI_CATEGORIES[category].join('')})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="player2-category">Player 2: </label>
        <select
          id="player2-category"
          value={player2Category}
          onChange={(e) => setPlayer2Category(e.target.value)}
        >
          {Object.keys(EMOJI_CATEGORIES).map(category => (
            <option key={category} value={category}>
              {category} ({EMOJI_CATEGORIES[category].join('')})
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleStart}>Start Game</button>
    </div>
  );
};

export default PlayerSetup;