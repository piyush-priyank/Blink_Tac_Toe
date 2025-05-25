import React from 'react';
import Cell from './Cell';
import '../App.css'; 

const Board = ({ board, onCellClick }) => {
  return (
    <div className="board">
      {board.flat().map((cellData, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        return (
          <Cell
            key={index}
            row={row}
            col={col}
            cellData={cellData}
            onClick={onCellClick}
          />
        );
      })}
    </div>
  );
};

export default Board;