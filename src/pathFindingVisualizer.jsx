import React, { Component } from "react";
import { djitskra } from "./Djitskra.js";
import Node from "./node.jsx";

let startNodeRow = 2;
let startNodeCol = 2;

let finishNodeRow = 19;
let finishNodeCol = 28;

class PathFindingVisualizer extends Component {
  constructor(props, context) {
    super(props, context);
    this.visualizeDjitskra = this.visualizeDjitskra.bind(this);
    this.state = {
      grid: [],
      mouseIsDown: false,
      movingFinish:false,
      movingStart:false,
      modalShow :true,
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
    console.log("vd" + finishNode.row+ " "+ finishNode.col);

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

  onMouseUp(rowIdx,colIdx){

    const grid = this.state.grid;
    if(this.state.movingFinish){
      finishNodeRow=rowIdx;
      finishNodeCol=colIdx;
      document.getElementById(`${rowIdx}-${colIdx}`).className='node-finish';
      grid[rowIdx][colIdx].isFinishNode=true;
    }
    else if(this.state.movingStart){
      startNodeRow=rowIdx;
      startNodeCol=colIdx;
      document.getElementById(`${rowIdx}-${colIdx}`).className='node-start';
      grid[rowIdx][colIdx].isStartNode=true;

    }
    this.setState({grid:grid,mouseIsDown:false,movingFinish:false,movingStart:false});
  

  }

  onMouseLeave(rowIdx,colIdx){
    if(document.getElementById(`${rowIdx}-${colIdx}`).className === `node-finish` && this.state.mouseIsDown&& this.state.movingFinish){
      document.getElementById(`${rowIdx}-${colIdx}`).className = `node`;
    }
    else if(document.getElementById(`${rowIdx}-${colIdx}`).className === `node-start` && this.state.mouseIsDown&& this.state.movingStart){
      document.getElementById(`${rowIdx}-${colIdx}`).className = `node`;

    }
  }


 
  onMouseEnter(rowIdx, colIdx) {
    const grid = this.state.grid;
    if(rowIdx===startNodeRow && colIdx===startNodeCol){}
    else if(rowIdx===finishNodeRow && colIdx===finishNodeCol){}
    else if(this.state.movingFinish && this.state.mouseIsDown){
      document.getElementById(`${rowIdx}-${colIdx}`).className = `node-finish`;

    }
    else if(this.state.mouseIsDown &&this.state.movingStart ){
      document.getElementById(`${rowIdx}-${colIdx}`).className = `node-start`;

    }
    else if(this.state.mouseIsDown)
    {
    grid[rowIdx][colIdx].isWall=true; document.getElementById(`${rowIdx}-${colIdx}`).className = `node-wall`;
    }
    

   this.setState({grid:grid})
  }

  onMouseDown(rowIdx, colIdx) {
    const grid = this.state.grid;

    if(rowIdx===startNodeRow && colIdx===startNodeCol){
      document.getElementById(`${rowIdx}-${colIdx}`).className = `node`;
      grid[rowIdx][colIdx].isStartNode=false;
      this.setState({grid:grid,movingStart:true,mouseIsDown:true})

    }
    else if(rowIdx===finishNodeRow && colIdx===finishNodeCol){
      document.getElementById(`${rowIdx}-${colIdx}`).className = `node`;
      grid[rowIdx][colIdx].isFinishNode=false;
      this.setState({grid:grid,movingFinish:true,mouseIsDown:true})
    }
    else if(document.getElementById(`${rowIdx}-${colIdx}`).className === `node`)
    {
    grid[rowIdx][colIdx].isWall=true; document.getElementById(`${rowIdx}-${colIdx}`).className = `node-wall`;
    this.setState({grid:grid,mouseIsDown:true})
    }
    else{
      grid[rowIdx][colIdx].isWall=false; document.getElementById(`${rowIdx}-${colIdx}`).className = `node`;
      this.setState({grid:grid,mouseIsDown:true})

    }


    
  }

  render() {
    return (
      <div>
        <div>
        <button className="button" onClick={this.visualizeDjitskra}>Visualize!</button>
        </div>

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
                  onMouseEnter={(row,col)=>{this.onMouseEnter(row,col)}}
                  onMouseUp={(row,col)=>{this.onMouseUp(row,col)}}
                  onMouseLeave={(row,col)=>this.onMouseLeave(row,col)}
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
