import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import PlayerSetup from './components/PlayerSetup';
import GameStatus from './components/GameStatus';
import HelpSection from './components/HelpSection';
import PlayAgainButton from './components/PlayAgainButton';
import { EMOJI_CATEGORIES, WINNING_PATTERNS } from './utils/constants';
import { getRandomEmoji, checkWin, initializeBoard } from './utils/GameHelper';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(initializeBoard());
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', category: null, activeEmojis: [], emoji: '' },
    { id: 2, name: 'Player 2', category: null, activeEmojis: [], emoji: '' },
  ]);
  const [currentPlayerId, setCurrentPlayerId] = useState(1);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [message, setMessage] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);

  const currentPlayer = players.find(p => p.id === currentPlayerId);

  useEffect(() => {
    if (gameStarted && !winner) {
      const currentCategoryEmojis = EMOJI_CATEGORIES[currentPlayer.category];
      setMessage(`${currentPlayer.name}'s Turn ${currentCategoryEmojis[0]}`); 
    } else if (winner) {
      setMessage(`Player ${winner.id} Wins! ${winner.emoji}`);
    }
  }, [currentPlayerId, gameStarted, winner, currentPlayer]);

  const handleStartGame = (player1Category, player2Category) => {
    setPlayers([
      { id: 1, name: 'Player 1', category: player1Category, activeEmojis: [], emoji: EMOJI_CATEGORIES[player1Category][0] },
      { id: 2, name: 'Player 2', category: player2Category, activeEmojis: [], emoji: EMOJI_CATEGORIES[player2Category][0] },
    ]);
    setGameStarted(true);
    setBoard(initializeBoard());
    setCurrentPlayerId(1);
    setWinner(null);
    setMessage('');
    setErrorVisible(false);
  };

  const showTempMessage = (msg) => {
    setMessage(msg);
    setErrorVisible(true);
    setTimeout(() => {
      setErrorVisible(false);
      if (!winner) { // Revert to turn message if no winner
        const currentCategoryEmojis = EMOJI_CATEGORIES[currentPlayer.category];
        setMessage(`${currentPlayer.name}'s Turn ${currentCategoryEmojis[0]}`);
      }
    }, 2000);
  };

  const handleCellClick = (row, col) => {
    if (!gameStarted || winner || (board[row][col]?.player === currentPlayerId && board[row][col]?.isOldest !== true)) {
      return;
    }

    const newBoard = JSON.parse(JSON.stringify(board));
    const newPlayers = JSON.parse(JSON.stringify(players));

    const player = newPlayers.find(p => p.id === currentPlayerId);
    if (!player) return;

    const currentEmoji = getRandomEmoji(EMOJI_CATEGORIES[player.category]);

    // Check for vanishing rule
    if (player.activeEmojis.length >= 3) {
      const oldestEmojiPos = player.activeEmojis[0];
      const [oldestRow, oldestCol] = oldestEmojiPos.split(',').map(Number);

      // Rule: The 4th emoji cannot be placed over where the 1st emoji was placed.
      if (oldestRow === row && oldestCol === col) {
        showTempMessage("Can't place 4th emoji on oldest spot!");
        return;
      }

      
      newBoard[oldestRow][oldestCol] = null; 
      player.activeEmojis.shift();
    }

    
    newBoard[row][col] = { emoji: currentEmoji, player: currentPlayerId, timestamp: Date.now() };
    player.activeEmojis.push(`${row},${col}`);

    setBoard(newBoard);
    setPlayers(newPlayers);

    // Check for win
    if (checkWin(newBoard, currentPlayerId, WINNING_PATTERNS)) {
      setWinner(player);
    } else {
      setCurrentPlayerId(currentPlayerId === 1 ? 2 : 1);
    }
  };

  const handlePlayAgain = () => {
    setBoard(initializeBoard());
    setPlayers([
      { id: 1, name: 'Player 1', category: null, activeEmojis: [], emoji: '' },
      { id: 2, name: 'Player 2', category: null, activeEmojis: [], emoji: '' },
    ]);
    setCurrentPlayerId(1);
    setWinner(null);
    setGameStarted(false);
    setMessage('');
    setErrorVisible(false);
  };

  return (
    <div className="app">
      <div className="game-header">
        <h1>Blink Tac Toe</h1>
        <button className="help-button" onClick={() => setShowHelp(true)}>
          <span role="img" aria-label="help">❓</span> Help
        </button>
      </div>

      {!gameStarted && !winner && (
        <div className="start-screen">
          <p className="description">
            A twisted version of Tic Tac Toe where your emojis vanish!
          </p>
          <PlayerSetup onStartGame={handleStartGame} />
        </div>
      )}

      {gameStarted && (
        <div className="game-container">
          <GameStatus
            message={message}
            isError={errorVisible}
            player1Turn={currentPlayerId === 1 && !winner}
            player2Turn={currentPlayerId === 2 && !winner}
          />
          <Board board={board} onCellClick={handleCellClick} />
          {winner && (
            <PlayAgainButton onClick={handlePlayAgain} />
          )}
        </div>
      )}

      {showHelp && <HelpSection onClose={() => setShowHelp(false)} />}
    </div>
  );
};

export default App;