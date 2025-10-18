"use client";
import { useState } from "react";
import './ColorBoard.css';

const ROWS = 4;
const COLS = 5;

type Cell = {
  symbol: string;
  checked: boolean;
};

function ColorBoard() {
  const [board, setBoard] = useState<Cell[][]>(
    Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => ({
        symbol: "X",
        checked: false,
      }))
    )
  );

  const onBoardClick = (i: number, j: number) => {
    const newBoard = board.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        rowIndex === i && colIndex === j
          ? { ...cell, checked: !cell.checked }
          : cell
      )
    );
    setBoard(newBoard);
  };

  return (
    <div className="color-board">
      {board.map((row, i) => (
        <div key={i} className="board-row">
          {row.map((cell, j) => (
            <div
              key={j}
              className={`board-cell ${cell.checked ? "checked" : "unchecked"}`}
              onClick={() => onBoardClick(i, j)}
            >
              {cell.checked ? "X" : "O"}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ColorBoard;