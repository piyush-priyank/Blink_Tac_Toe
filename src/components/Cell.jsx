import React from 'react';
import '../App.css';


const Cell = ({ row, col, cellData, onClick, isWinningCell }) => {
  
  const cellClass = `cell ${cellData ? 'is-placed' : ''} ${isWinningCell ? 'is-winning-cell' : ''}`; // CLASS: Apply class
  
  return (
    <div
      className={cellClass}
      onClick={() => onClick(row, col)}
    >
      {cellData ? cellData.emoji : ''}
    </div>
  );
};

export default Cell;