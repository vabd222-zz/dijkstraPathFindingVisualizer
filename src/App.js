import logo from './logo.svg';
import './App.css';
import PathFindingVisualizer from "./pathFindingVisualizer.jsx";


function hello(){

  const node =  document.getElementsByClassName("node");
  for(let i=0; i<node.length; i++){
    node[i].style.backgroundColor==="red"?  node[i].style.backgroundColor="yellow": node[i].style.backgroundColor="red";
  }

 

  
  
}

function App() {
  return (
    <div className="container">
      <PathFindingVisualizer/>
    </div>
  );
}

export default App;
