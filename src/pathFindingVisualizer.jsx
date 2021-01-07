import React, { Component } from "react";
import {djitskra} from "./Djitskra.js";

class PathFindingVisualizer extends Component {
  constructor(props, context) {
    super(props, context);
    //this.InitializingGrid = this.InitializingGrid.bind(this);
    this.visualizeDjitskra = this.visualizeDjitskra.bind(this);
    this.state = {
      grid: [],
    };
  }

  componentDidMount(){

    const grid = createGrid();
    this.setState({grid: grid,})
  }


 /*  InitializingGrid() {
    let grid = [];

    for (let i = 0; i < 10; i++) {
      let currentRow = [];
      for (let j = 0; j < 20; j++) {
        currentRow.push({ row:i, col:j, distance: Infinity, isVisited: false, previousNode:null, });
      }

      grid.push(currentRow);
    }

    this.setState({
        grid:this.grid,
    });
  } */

  visualizeDjitskra(){
      const nodes = djitskra(this.state.grid,0,0);

        for(let i=0; i<nodes.length; i++){
            console.log("row:" +nodes[i].row +" col:"+ nodes[i].col + " distance:"+ nodes[i].distance + " "+ printPaths(nodes[i]),"");
        }

     /*  for(let i=0; i<10; i++){
          console.log("hello");
      } */
  }

  render() {
    return <div>
        {this.InitializingGrid}
        <button onClick={this.visualizeDjitskra}>TestDjitskra</button>
    </div>;
  }
}

let printPaths = (nodes,paths)=>{

    if(nodes.previousNode===null){

        return `${nodes.row}${nodes.col}`;
    }

    else{
        paths=`${nodes.row}${nodes.col}<- `
        return paths+printPaths(nodes.previousNode,paths)
    }
    return paths;
}

let createGrid = ()=>{

    let grid = [];

    for (let i = 0; i < 4; i++) {
      let currentRow = [];
      for (let j = 0; j < 4; j++) {
        currentRow.push({ row:i, col:j, distance: Infinity, isVisited: false, previousNode:null, });
      }

      grid.push(currentRow);
    }
 
    for(let i=1; i<4; i++){
        grid[0][i].isVisited=true;
    }
    grid[1][3].isVisited=true;
    grid[2][3].isVisited=true; 
    grid[3][1].isVisited=true;

    return grid;


}

export default PathFindingVisualizer;
