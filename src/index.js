import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Game from './game.js'
import './index.css';

export function Square(props){
  return (
    <button 
    	className="square"
    	onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

//gets each set of rows and calls getSets to produce an array of all potential horizontal winning combinations.
function getHorizontal(col, row, win_length) {
  let horizontal = [];
  let val = 0;
  for (let i=0; i <= row-1; i++){
    let current_row = [];
    for(let j=0; j<=col-1; j++){
      current_row.push(val);
      val++;
    }
    horizontal.push(getSets(current_row, win_length));
  }
  return(horizontal);
}

//gets each set of columns and calls getSets to produce an array of all potential vertical winning combinations.
function getVertical(col, row, win_length){
  let vertical = [];
  let val = 0;
  for (let i=0; i <= col-1; i++){
    let current_col = [];
    for(let j=0; j<=row-1; j++){
      current_col.push(val);
      val+= row;
    }
    vertical.push(getSets(current_col, win_length));
    val = i+1;
  }
  return(vertical);
}

//gets each diagonal set and calls getSets to produce an array of all potential diagonal winning combinations.
function getDiagonal(col, row, win_length){
  let diag_left = [];
  let diag_right = [];
  let diag_sets = [];
  for(let i=0; i<= (row*col)-1; i+=(col+1)){
    diag_left.push(i)
  }
  diag_sets.push(getSets(diag_left, win_length))
  for(let i=col-1; i<=(row*(col))-col; i+=(col-1)){
    diag_right.push(i);
  }
  diag_sets.push(getSets(diag_right, win_length))
  return(diag_sets);
}

//here we get all potential winning sets from the set passed in. This is based on the win_length prescribed by the user.
export function getSets(set, win_length){
  let new_sets = [];
  let val = 0;
  if(set.length <= win_length){
    while(win_length + val <= set){
      const new_set = set.slice(val, win_length);
      val++;
    }
    return new_sets;
  }
  else{
    return set;
  }
}

function scoreAnalyzer(length, squares){
  
}

export function calculateWinner(squares) {
  const horizontal = getHorizontal(5,5,5);
  const vertical = getVertical(5,5,5);
  const diagonal = getDiagonal(5,5,5);
  const lines = [...horizontal, ...vertical, ...diagonal];
  debugger
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
      return squares[a];
    }
  }
  return null;
}
