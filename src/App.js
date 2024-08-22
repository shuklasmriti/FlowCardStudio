import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FlowCanvas from '../src/FlowCanvas';
import './App.css';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>Welcome to Flow-Card-Studio!</h1>
        <FlowCanvas />
      </div>
    </DndProvider>
  );
}

export default App;
