import logo from './logo.svg';
import './App.css';
import PathFindingVisualizer from "./pathFindingVisualizer.jsx";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


export function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Dijkstra Path Finding Visualizer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Tutorial</h4>
       <ol>
         <li>Press and drag start (RED) and end (Green) nodes to change their positions</li>
         <li>Press and drag to create walls </li>
         <li>Press Visualize! button</li>
       </ol>
       <p style={{color:"red"}}>Note: This project is still being worked on and not complete.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
function App() {

  const [modalShow, setModalShow] = React.useState(true);
  return (
   <div>
     <MyVerticallyCenteredModal show={modalShow}onHide={() => setModalShow(false)}/>
     <PathFindingVisualizer/>
   </div>
  );
}

export default App;
