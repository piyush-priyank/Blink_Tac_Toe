import React from 'react';
import '../App.css'; 

const GameStatus = ({ message, isError, player1Turn, player2Turn }) => {
  let statusClass = 'game-status';
  if (isError) {
    statusClass += ' error-message';
  } else if (player1Turn) {
    statusClass += ' player-1-turn';
  } else if (player2Turn) {
    statusClass += ' player-2-turn';
  } else {
    statusClass += ' winner'; 
  }

  return (
    <div className={statusClass}>
      {message}
    </div>
  );
};

export default GameStatus;