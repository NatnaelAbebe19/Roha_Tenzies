import React, { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import "./App.css";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapseTime, setElapseTime] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const storedHighScore = localStorage.getItem("highScore");
    return storedHighScore ? parseInt(storedHighScore) : Infinity;
  });
  let timerInterval;
  React.useEffect(() => {
    if (startTime && !tenzies) {
      timerInterval = setInterval(() => {
        const currentTime = new Date();
        const elapse = Math.floor((currentTime - startTime) / 1000);
        setElapseTime(elapse);
      }, 1000);
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [startTime, tenzies]);

  const startGame = () => {
    setStartTime(new Date());
  };

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  React.useEffect(() => {
  if (tenzies) {
    if (elapseTime < highScore) {
      setHighScore(elapseTime);
      localStorage.setItem("highScore", elapseTime.toString());
    }
  }
}, [tenzies, elapseTime, highScore]);

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function holdDice(id) {
    if (!startTime) {
      startGame();
    }
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      tenzies={tenzies}
    />
  ));

  function rollDice() {
    if (!tenzies) {
      setClickCount((prevCount) => prevCount + 1);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setClickCount(0);
      setStartTime(null);
    }
  }

  const { width, height } = useWindowSize();

  return (
    <div className="container">
      <div className="inside--container">
        <div className="header">
          {tenzies && <Confetti width={width} height={height} />}
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className={`die--wrapper`}>{diceElements}</div>
        {!tenzies && <span>Rolls {clickCount}  <br /></span>}
        {tenzies && (
          <span className="win">
            You won! with {clickCount} rolls in {elapseTime}s
            <br />
            
            {clickCount <= 15 && <span>Excellent 👏👏👏</span>}
            {clickCount <= 20 && clickCount > 16 && <span>Very Good 👏👏</span>}
            {clickCount < 30 && clickCount > 20 && <span> Good 👏</span>}
          </span>
        )}
        <button onClick={rollDice}>{tenzies ? "New game" : "Roll"}</button>
        <span>highScore: {highScore}s</span>
      </div>
    </div>
  );
}

export default App;
 