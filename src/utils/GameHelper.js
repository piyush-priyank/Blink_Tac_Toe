import { EMOJI_CATEGORIES, WINNING_PATTERNS } from './constants';

/**
 * Returns a random emoji from the given category.
 * @param {string[]} categoryEmojis - An array of emojis for a specific category.
 * @returns {string} A random emoji.
 */
export const getRandomEmoji = (categoryEmojis) => {
  const randomIndex = Math.floor(Math.random() * categoryEmojis.length);
  return categoryEmojis[randomIndex];
};

/**
 * Initializes an empty 3x3 board.
 * @returns {Array<Array<null>>} A 3x3 array filled with nulls.
 */
export const initializeBoard = () => {
  return Array(3).fill(null).map(() => Array(3).fill(null));
};

/**
 * Checks if a player has won the game.
 * @param {Array<Array<Object|null>>} board - The current state of the board.
 * @param {number} playerId - The ID of the player to check for a win.
 * @param {Array<Array<number>>} patterns - Predefined winning patterns.
 * @returns {boolean} True if the player has won, false otherwise.
 */
export const checkWin = (board, playerId, patterns) => {
  const flatBoard = board.flat(); 

  for (let i = 0; i < patterns.length; i++) {
    const [a, b, c] = patterns[i];
    
    if (
      flatBoard[a] && flatBoard[a].player === playerId &&
      flatBoard[b] && flatBoard[b].player === playerId &&
      flatBoard[c] && flatBoard[c].player === playerId
    ) {
      return true; 
    }
  }
  return false; 
};