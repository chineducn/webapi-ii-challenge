import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  useEffect(() => {
    axios
      .get("http://localhost:7800/api/posts")
      .then(res => {
        debugger
      })
      .catch(err => {
        debugger
      })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        
          Learn React
        
      </header>
    </div>
  );
}

export default App;
