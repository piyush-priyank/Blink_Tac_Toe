import React from 'react';
import '../App.css'; 

const HelpSection = ({ onClose }) => {
  return (
    <div className="help-section-overlay">
      <div className="help-section-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>How to Play Blink Tac Toe</h2>
        <ol>
          <li>
            <strong>Board Structure:</strong> The game is played on a 3x3 grid. It can hold a maximum of 6 active emojis (3 per player).
          </li>
          <li>
            <strong>Emoji Categories:</strong>
            <ul>
              <li>Before the game starts, each player selects an emoji category (e.g., Animals, Food, Sports).</li>
              <li>On their turn, a player is assigned a random emoji from their chosen category.</li>
            </ul>
          </li>
          <li>
            <strong>Turn-Based Play:</strong>
            <ul>
              <li>Player 1 begins, then Player 2, and turns alternate.</li>
              <li>Players can place their emoji on any empty cell.</li>
            </ul>
          </li>
          <li>
            <strong>Vanishing Rule:</strong>
            <ul>
              <li>Each player can have only 3 emojis on the board at any time.</li>
              <li>When a player places their 4th emoji, their *oldest* emoji (the first one they placed) is automatically removed from the board (FIFO logic).</li>
              <li>Crucially, the 4th emoji *cannot* be placed in the cell where the oldest emoji was just removed.</li>
              <li>The removed cell becomes empty and reusable.</li>
            </ul>
          </li>
          <li>
            <strong>Winning Condition:</strong>
            <ul>
              <li>A player wins by forming a line of 3 of their own emojis: horizontally, vertically, or diagonally.</li>
              <li>All 3 winning emojis must belong to the same player (category-based check).</li>
            </ul>
          </li>
          <li>
            <strong>Game Ending:</strong>
            <ul>
              <li>The game continues until one player wins. Draws are not possible.</li>
              <li>After a win, a "Player X Wins!" message is displayed.</li>
              <li>A "Play Again" button appears to restart the game from scratch.</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default HelpSection;