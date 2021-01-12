import React, { Component } from 'react';
import "./node.css"

class Node extends Component {

    
    render() {
        const{
            row,
            col,
            isStartNode,
            isFinishNode,
            isWall,
            onMouseDown
        }=this.props;

        const className = isStartNode ? 'node-start' : (isFinishNode ? 'node-finish': (isWall?'node-wall':'node'));
        return (
           <div id={`${row}-${col}`} className={className} onMouseDown={()=>{onMouseDown(row,col)}}></div>
        );
    }
}

export default Node;