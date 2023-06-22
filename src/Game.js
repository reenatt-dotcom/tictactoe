import React, { useState, useEffect } from 'react';
import Board from './Board';
import Status from './Status';
import ResetButton from './ResetButton';
import './styles.css'

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  useEffect(() => {
    if (!isXNext) {
      // Computer's turn
      const randomIndex = getRandomMove(board);
      makeMove(randomIndex);
    }
  }, [isXNext, board]);

  const handleClick = (index) => {
    if (calculateWinner(board) || board[index] || !isXNext) {
      return;
    }

    makeMove(index);
  };

  const makeMove = (index) => {
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.every((cell) => cell !== null)) {
    status = 'It\'s a draw!';
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div>
      <Board squares={board} onClick={handleClick} />
      <Status status={status} />
      <ResetButton onReset={handleReset} />
    </div>
  );
};

// Helper function to calculate the winner
const calculateWinner = (squares) => {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

// Helper function to get a random available move for the computer player
const getRandomMove = (board) => {
  const availableMoves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      availableMoves.push(i);
    }
  }
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
};

export default Game;
