import React, { useEffect, useState } from 'react';
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
  { src: 'circle.png' },
  { src: 'diamond.png' },
  { src: 'parallelogram.png' },
  { src: 'pentagon.png' },
  { src: 'rectangle.png' },
  { src: 'square.png' },
  { src: 'trapezoid.png' },
  { src: 'triangle.png' },
];
export interface ICards {
  src: string;
  id: number;
}

interface ICard {
  src: string | null;
}
export function MemoryGame() {
  const [cards, setCards] = useState<ICards[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [turns, setTurns] = useState(0);
  const [selectOne, setSelectOne] = useState(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectTwo, setSelectTwo] = useState(null);

  const shuffleCards = () => {
    const shuffledCards = [...CARD_IMAGES, ...CARD_IMAGES]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    console.log(shuffledCards);
    setCards(shuffledCards);
    setTurns(0);
    // console.log(card.src)
  };

  const handleSelect = (card: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    selectOne ? setSelectTwo(card) : setSelectOne(card);
  };

  const resetTurn = () => {
    setSelectOne(null);
    setSelectTwo(null);
    setTurns((prev) => prev + 1);
  };

  useEffect(() => {
    if (selectOne && selectTwo) {
      if (selectOne.src === selectTwo.src) {
        console.log('match');
        resetTurn();
      } else {
        console.log('not match');
        resetTurn();
      }
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return (
    <div className="game-wrapper">
      <button className="border" onClick={shuffleCards}>
        Shuffle Cards
      </button>
      Memory game
      <div className="grid-cards">
        {cards.map((card) => (
          <SingleCard card={card} key={card.id} handleSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}
