export function djitskra(grid, rowSourceNode, colSourceNode) {
  grid[rowSourceNode][colSourceNode].distance = 0;
  let nodes = getAllNodes(grid);

  console.log(grid.length);
    console.log(grid[0].length);

  for (let i = 0; i < nodes.length; i++) {

    nodes = getAllNodes(grid);

    const u = minDistance(nodes);

    if(u===Infinity) continue;

    console.log("Idx: "+ u);

    const currentNode = nodes[u];
    grid[currentNode.row][currentNode.col].isVisited=true;


    if (parseInt(currentNode.row+1)<= grid.length-1) {
      /* console.log("currentRow1: "+parseInt(currentNode.row+1) );
      console.log("currentRow2: "+ parseInt(currentNode.row) );
      console.log("currentCol: "+ currentNode.col); */
      let adjacentNode = grid[parseInt(currentNode.row + 1)][currentNode.col];
      updateDistance(adjacentNode, currentNode, grid);
    }

    if (parseInt(currentNode.col + 1) <= grid[0].length-1) {
      let adjacentNode = grid[currentNode.row][parseInt(currentNode.col + 1)];
      updateDistance(adjacentNode, currentNode, grid);
    }

    if (parseInt(currentNode.row - 1) >= 0) {
      let adjacentNode = grid[parseInt(currentNode.row - 1)][currentNode.col];
      updateDistance(adjacentNode, currentNode, grid);
    }

    if (parseInt(currentNode.col - 1) >= 0) {
      let adjacentNode = grid[currentNode.row][parseInt(currentNode.col - 1)];
      updateDistance(adjacentNode, currentNode, grid);
    }
  }

  return nodes;
}

let updateDistance = (adjacentNode, currentNode, grid) => {
  if (
    currentNode.distance + 1 < adjacentNode.distance &&
    adjacentNode.isVisited === false
  ) {
    grid[adjacentNode.row][adjacentNode.col].distance =
      parseInt(currentNode.distance + 1);
    grid[adjacentNode.row][adjacentNode.col].previousNode = currentNode;
  }
};
let minDistance = (nodes) => {
  let min=Infinity;
  let minIndex = Infinity;


  for(let i=0; i<nodes.length; i++){
    let nodeDistance = nodes[i].distance;
    if (nodeDistance<= min && nodes[i].isVisited === false) {
        min = nodes[i].distance;
        minIndex = i;
      }


  }


  return minIndex;
};

let getAllNodes = (grid) => {
  let nodes = [];

  for (const row in grid) {
    for (const col in grid[row]) {
      nodes.push(grid[row][col]);
    }
  }
  return nodes;
};
