import { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }


  const diceElements = dice.map((die) => <Die key={die.id} value={die.value} />);
  function rollDice() {
    setDice(allNewDice());
  }

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
        <div className="die--wrapper">{diceElements}</div>
        <button onClick={rollDice}>Roll</button>
      </div>
    </div>
  );
}

export default App;
