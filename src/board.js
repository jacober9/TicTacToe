import React, { Component } from 'react';
import {Square} from './index.js'
import './index.css';

export default class Board extends Component {

    renderSquare(i) {
      return ( 
          <Square
            value={this.props.squares[i]} 
            onClick={() => this.props.onClick(i)}
          />
         );
    }
  
    cols(cols, cell){
      let cells = [];
      for(let i = 1; i <= cols; i++){
        cells.push(this.renderSquare(cell))
        cell++;
      }
      return cells
    }
  
    render() {
      const rows = 5;
      const cols = 5;
      let table = [];
      let cell = 0;
      for (let i = 1; i<= rows; i++){
        table.push(<div className="board-row">{this.cols(cols, cell)}</div>)
        cell += cols
      }
      return (
        <div className="board">
          {table}
        </div>
      );
    }
}