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
  const [messageType, setMessageType] = useState('info');
  
  const [winningLine, setWinningLine] = useState(null); 
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const currentPlayer = players.find(p => p.id === currentPlayerId);

  useEffect(() => {
    if (gameStarted && !winner && messageType === 'info') {
      const currentCategoryEmojis = EMOJI_CATEGORIES[currentPlayer.category];
      setMessage(`${currentPlayer.name}'s Turn ${currentCategoryEmojis[0]}`);
    } else if (winner) {
      setMessage(`Player ${winner.id} Wins!`);
    }
  }, [currentPlayerId, gameStarted, winner, currentPlayer, messageType]);

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
    setMessageType('info');
    
    setWinningLine(null); 
    
    setShowConfirmReset(false);
  };

  const showTempMessage = (msg, type = 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      if (!winner && gameStarted) {
        const currentCategoryEmojis = EMOJI_CATEGORIES[currentPlayer.category];
        setMessage(`${currentPlayer.name}'s Turn ${currentCategoryEmojis[0]}`);
        setMessageType('info');
      } else if (!gameStarted && !winner) {
         setMessage('');
         setMessageType('info');
      } else if (winner) {
          setMessage(`Player ${winner.id} Wins!`);
          setMessageType('winner');
      }
    }, 2000);
  };

  const handleCellClick = (row, col) => {
    if (!gameStarted) {
      return;
    }
    if (winner) {
      return;
    }

    const newBoard = JSON.parse(JSON.stringify(board));
    const newPlayers = JSON.parse(JSON.stringify(players));
    const player = newPlayers.find(p => p.id === currentPlayerId);

    if (!player) {
      console.error("Current player not found, this shouldn't happen.");
      return;
    }

    if (newBoard[row][col] && newBoard[row][col].player === currentPlayerId) {
      showTempMessage("You already have an emoji here!", "info");
      return;
    }

    const currentEmoji = getRandomEmoji(player);
    let oldestEmojiRemoved = false;

    if (player.activeEmojis.length >= 3) {
      const oldestEmojiPos = player.activeEmojis[0];
      const [oldestRow, oldestCol] = oldestEmojiPos.split(',').map(Number);

      if (oldestRow === row && oldestCol === col) {
        showTempMessage("Can't place 4th emoji on your oldest spot!", "error");
        return;
      }

      newBoard[oldestRow][oldestCol] = null;
      player.activeEmojis.shift();
      oldestEmojiRemoved = true;
    }

    newBoard[row][col] = { emoji: currentEmoji, player: currentPlayerId, timestamp: Date.now() };
    player.activeEmojis.push(`${row},${col}`);

    setBoard(newBoard);
    setPlayers(newPlayers);

    // START: Changes for Highlighting Winning Combination
    const currentWinningLine = checkWin(newBoard, currentPlayerId, WINNING_PATTERNS); // CALL: Get the winning line
    if (currentWinningLine) {
      setWinner(player);
      setWinningLine(currentWinningLine); // SET: Store the winning line in state
      setMessageType('winner'); // UPDATE: Set message type to 'winner'
    } else {
    // END: Changes for Highlighting Winning Combination
      setCurrentPlayerId(currentPlayerId === 1 ? 2 : 1);
      setMessageType('info');
    }
  };

  const handlePlayAgain = () => {
    if (gameStarted && !winner) {
      setShowConfirmReset(true);
    } else {
      resetGame();
    }
  };

  const resetGame = () => {
    setBoard(initializeBoard());
    setPlayers([
      { id: 1, name: 'Player 1', category: null, activeEmojis: [], emoji: '' },
      { id: 2, name: 'Player 2', category: null, activeEmojis: [], emoji: '' },
    ]);
    setCurrentPlayerId(1);
    setWinner(null);
    setGameStarted(false);
    setMessage('');
    setMessageType('info');
    // START: Changes for Highlighting Winning Combination
    setWinningLine(null); // RESET: Clear winning line on game reset
    // END: Changes for Highlighting Winning Combination
    setShowConfirmReset(false);
  };

  const cancelReset = () => {
    setShowConfirmReset(false);
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
            isError={messageType === 'error'}
            isInfo={messageType === 'info'}
            player1Turn={currentPlayerId === 1 && !winner}
            player2Turn={currentPlayerId === 2 && !winner}
            // START: Changes for Highlighting Winning Combination
            isWinnerMessage={!!winner} // NEW PROP: Indicate if it's a winner message for styling
            // END: Changes for Highlighting Winning Combination
          />
          {/* START: Changes for Highlighting Winning Combination */}
          <Board board={board} onCellClick={handleCellClick} winningLine={winningLine} /> {/* PROP: Pass winningLine */}
          {/* END: Changes for Highlighting Winning Combination */}
          <button className="play-again-button" onClick={handlePlayAgain}>
            {winner ? 'Play Again' : 'Restart Game'}
          </button>
        </div>
      )}

      {showHelp && <HelpSection onClose={() => setShowHelp(false)} />}

      {showConfirmReset && (
        <div className="help-section-overlay">
          <div className="help-section-content confirm-reset-modal">
            <h2>Restart Game?</h2>
            <p>Are you sure you want to restart the current game?</p>
            <button onClick={resetGame} className="confirm-button">Yes, Restart</button>
            <button onClick={cancelReset} className="cancel-button">No, Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;