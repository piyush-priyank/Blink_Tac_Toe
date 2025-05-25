import { EMOJI_CATEGORIES, WINNING_PATTERNS } from './constants';

/**
 * Returns a random emoji from the given player's category.
 * @param {Object} player - The player object with a 'category' property.
 * @returns {string} A random emoji.
 */
export const getRandomEmoji = (player) => {
  const categoryEmojis = EMOJI_CATEGORIES[player.category];
  if (!categoryEmojis || categoryEmojis.length === 0) {
    console.warn(`No emojis found for category: ${player.category}. Falling back to default.`);
    return '❓';
  }
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
 * Checks if a player has won the game and returns the winning pattern.
 * @param {Array<Array<Object|null>>} board - The current state of the board.
 * @param {number} playerId - The ID of the player to check for a win.
 * @param {Array<Array<number>>} patterns - Predefined winning patterns.
 * @returns {Array<number>|null} The winning pattern (array of indices) if won, null otherwise.
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
      return patterns[i]; 
    }
  }
  return null;
};
