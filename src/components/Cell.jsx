import React from 'react';
import '../App.css'; 

const Cell = ({ row, col, cellData, onClick }) => {
  const cellClass = `cell ${cellData ? 'is-placed' : ''}`; 

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