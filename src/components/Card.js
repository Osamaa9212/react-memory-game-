import React from "react";
import "./Card.css";

const Card = ({ handleClick, card, flipped }) => {
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} />
        <img
          className="back"
          onClick={() => handleClick(card)}
          src="./img/cover.png"
        />
      </div>
    </div>
  );
};

export default Card;
