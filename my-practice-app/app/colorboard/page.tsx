"use client";
import { useState } from "react";

const ROWS = 4;
const COLS = 5;

function ColorBoard() {
  const [board, setBoard] = useState(
    Array.from(Array(ROWS), () =>
      Array(COLS).fill({
        symbol: "X",
        checked: false,
      })
    )
  );
  const onBoardClick = (i: number, j: number) => {
    const boardCopy = JSON.parse(JSON.stringify(board));
    boardCopy[i][j].checked = !boardCopy[i][j].checked;
    console.log(i, j);
    setBoard(boardCopy);
  };
  return (
    <div>
      {board.map((row, i) => (
        <div key={i} style={{ display: "flex" }}>
          {row.map((col, j) => (
            <div
              key={j}
              onClick={() => onBoardClick(i, j)}
              style={{
                border: "1px solid white",
                padding: "2px",
                margin: "2px",
                color: col.checked ? "yellow" : "red",
              }}
            >
              {col.checked ? "X" : "O"}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ColorBoard;
