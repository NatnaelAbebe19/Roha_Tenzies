import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "dodgerblue" : "#fff",
    // backgroundColor: props.tenzies ? "green" : "#dodgerblue",
  };
  const dots = Array.from({ length: props.value }, (_, index) => (
    <div key={index} className="dot">
      .
    </div>
  ));

  const elements = <div className="Dots">{dots}</div>;

  return (
    <div className="die" style={styles} onClick={props.holdDice}>
      {elements}
    </div>
  );
}
