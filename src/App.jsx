import { useState } from "react";
import Die from "./components/Die";
import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="inside--container">
        <div className="header">
          <h2>Tenzies</h2>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="die--wrapper">
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
        </div>
        <div className="roll">
          <button>Roll</button>
        </div>
      </div>
    </div>
  );
}

export default App;
