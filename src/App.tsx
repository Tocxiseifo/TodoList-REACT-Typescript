import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { v4  as uuid} from 'uuid';
import Todo from './components/Todos';

function App() {
  return (
    <div className="App">
      {/* <ShoppingCart/> */}
      
        <Todo />
    </div>
  );
}

export default App;
