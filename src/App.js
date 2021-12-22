import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

const cardImages = [
  { src: "./img/helmet-1.png", matched: false },
  { src: "./img/potion-1.png", matched: false },
  { src: "./img/ring-1.png", matched: false },
  { src: "./img/scroll-1.png", matched: false },
  { src: "./img/shield-1.png", matched: false },
  { src: "./img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [counter, setCounter] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [turns, setTurns] = useState(0);

  const resetTurn = () => {
    setTimeout(() => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns((p) => p + 1);
      setDisabled(false);
    }, 500);
  };

  useEffect(() => {
    console.log("choiceOne : ", choiceOne, "choicetwo : ", choiceTwo);

    if (choiceOne !== null && choiceTwo !== null) {
      setDisabled(true);
      if (choiceOne.src == choiceTwo.src) {
        setDisabled(true);
        console.log("matched");
        setCounter((c) => c + 1);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      }

      resetTurn();
    } else if (choiceOne !== null && choiceTwo !== null) {
      resetTurn();
    } else {
      console.log("not matched");
    }
  }, [choiceOne, choiceTwo]);

  const shuffleImages = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => 0.5 - Math.random())
      .map((card) => ({ ...card, id: Math.random }));
    setCards(shuffledCards);
    setTurns(0);
    setCounter(0);
  };

  const handleClick = (card) => {
    if(disabled === false) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  return (
    <div className="App">
      <h1>{counter === 6 ? "Congratulations you have won ! " : ""}</h1>
      <h3>Turns : {turns}</h3>

      <button onClick={() => shuffleImages()}>
        {cards.length > 0 ? "New game!" : "start new game !"}{" "}
      </button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={Math.random()}
            card={card}
            handleClick={handleClick}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
//<button onClick = {() => console.log(cards)}>show cards </button>
export default App;
