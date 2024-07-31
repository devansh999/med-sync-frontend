import React from 'react';
import RegisterUser from './RegisterUser';
import GetUser from './GetUser';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Meddx Registration</h1>
      </header>
      <RegisterUser />
      <GetUser />
    </div>
  );
}

export default App;
