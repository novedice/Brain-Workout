import React, { useEffect, useState } from 'react';
// import React, { useState } from 'react';
import './MemoryGame.css';
import '../../assets/memory-game/circle.png';
import '../../assets/memory-game/diamond.png';
import '../../assets/memory-game/parallelogram.png';
import '../../assets/memory-game/pentagon.png';
import '../../assets/memory-game/question.png';
import '../../assets/memory-game/rectangle.png';
import '../../assets/memory-game/square.png';
import '../../assets/memory-game/trapezoid.png';
import '../../assets/memory-game/triangle.png';
import SingleCard from './SingleCard';

const CARD_IMAGES = [
  { src: 'circle.png', matched: false },
  { src: 'diamond.png', matched: false },
  { src: 'parallelogram.png', matched: false },
  { src: 'pentagon.png', matched: false },
  { src: 'rectangle.png', matched: false },
  { src: 'square.png', matched: false },
  { src: 'trapezoid.png', matched: false },
  { src: 'triangle.png', matched: false },
];
export interface ICards {
  src: string;
  id: number;
  matched: boolean | undefined;
}

// interface ICard {
//   src: string | null;
// }
export function MemoryGame() {
  const [cards, setCards] = useState<ICards[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [turns, setTurns] = useState(0);
  const [selectOne, setSelectOne] = useState<ICards | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectTwo, setSelectTwo] = useState<ICards | null>(null);

  const shuffleCards = () => {
    const shuffledCards = [...CARD_IMAGES, ...CARD_IMAGES]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    console.log(shuffledCards);
    setCards(shuffledCards);
    setTurns(0);
    // console.log(card.src)
  };

  const handleSelect = (card: ICards) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    selectOne ? setSelectTwo(card) : setSelectOne(card);
    console.log(card);
  };

  const resetTurn = () => {
    setSelectOne(null);
    setSelectTwo(null);
    setTurns((prev) => prev + 1);
  };

  useEffect(() => {
    if (selectOne && selectTwo) {
      if (selectOne.src === selectTwo.src) {
        setCards((prewCards) => {
          return prewCards.map((card) => {
            if (card.src === selectOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [selectOne, selectTwo]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return (
    <div className="game-wrapper">
      <button className="border" onClick={shuffleCards}>
        Shuffle Cards
      </button>
      Memory game
      <div className="grid-cards">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleSelect={handleSelect}
            flip={card === selectOne || card === selectTwo || card.matched}
          />
        ))}
      </div>
    </div>
  );
}
