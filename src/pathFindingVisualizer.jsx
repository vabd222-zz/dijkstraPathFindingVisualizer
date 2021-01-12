import React, { Component } from "react";
import { djitskra } from "./Djitskra.js";
import Node from "./node.jsx";

const startNodeRow = 2;
const startNodeCol = 2;

const finishNodeRow = 19;
const finishNodeCol = 28;

class PathFindingVisualizer extends Component {
  constructor(props, context) {
    super(props, context);
    this.visualizeDjitskra = this.visualizeDjitskra.bind(this);
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    const grid = createGrid();
    this.setState({ grid: grid });
  }

  visualizeDjitskra() {
    const nodes = djitskra(this.state.grid, startNodeRow, startNodeCol);
    let finishNode = {};

    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].isFinishNode) finishNode = nodes[i];
    }

    const shortestPathNodes = printPaths(finishNode, []);

    for (let i = 0; i < shortestPathNodes.length - 1; i++) {
      const [rowIdx, colIdx] = shortestPathNodes[i];

      setTimeout(() => {
        document.getElementById(
          `${rowIdx}-${colIdx}`
        ).className = `node-shortest-path`;
      }, i * 100);
    }
  }

 
  onMouseLeave(rowIdx, colIdx) {
    document.getElementById(`${rowIdx}-${colIdx}`).className = `node`;
  }

  onMouseDown(rowIdx, colIdx) {
    const grid = this.state.grid;
    if(rowIdx===startNodeRow && colIdx===startNodeCol){}
    else if(rowIdx===finishNodeRow && colIdx===finishNodeCol){}
    else
    {
    grid[rowIdx][colIdx].isWall=true; document.getElementById(`${rowIdx}-${colIdx}`).className = `node-wall`;
    }

   this.setState({grid:grid})

    
  }

  render() {
    return (
      <div>
        <button onClick={this.visualizeDjitskra}>TestDjitskra</button>

        <div className="grid">
          {this.state.grid.map((row, rowIdx) => {
            return row.map((node, nodeIdx) => {
              const { row, col, isFinishNode, isStartNode,isWall } = node;

              return (
                <Node
                  row={row}
                  col={col}
                  isStartNode={isStartNode}
                  isFinishNode={isFinishNode}
                  isWall={isWall}
                  onMouseDown={(row,col)=>this.onMouseDown(row,col)}
                ></Node>
              );
            });
          })}
        </div>
      </div>
    );
  }
}

let printPaths = (finishNode, shortestPathNodes) => {
  if (finishNode.previousNode === null) {
    return shortestPathNodes;
  } else {
    shortestPathNodes.unshift([finishNode.row, finishNode.col]);
    return printPaths(finishNode.previousNode, shortestPathNodes);
  }
};

let createGrid = () => {
  let grid = [];

  for (let i = 0; i < 20; i++) {
    let currentRow = [];
    for (let j = 0; j < 50; j++) {
      currentRow.push({
        row: i,
        col: j,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
        isStartNode: i === startNodeRow && j === startNodeCol,
        isFinishNode: i === finishNodeRow && j === finishNodeCol,
        isWall:false
      });
    }

    grid.push(currentRow);
  }
  return grid;
};

export default PathFindingVisualizer;
