import React, { useState } from 'react';
import './MemoryGame.css';

// import { SS } from '../../assets/memory-game/s';
// import { CARD_IMAGES } from '../../constants/memory-game-const';
import '../../assets/memory-game/circle.png';
import '../../assets/memory-game/diamond.png';
import '../../assets/memory-game/parallelogram.png';
import '../../assets/memory-game/pentagon.png';
import '../../assets/memory-game/question.png';
import '../../assets/memory-game/rectangle.png';
import '../../assets/memory-game/square.png';
import '../../assets/memory-game/trapezoid.png';
import '../../assets/memory-game/triangle.png';

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
interface ICards {
  src: string;
  id: number;
}
export function MemoryGame() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cards, setCards] = useState<ICards[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [turns, setTurns] = useState(0);

  const shuffleCards = () => {
    const shuffledCards = [...CARD_IMAGES, ...CARD_IMAGES]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    console.log(shuffledCards);
    setCards(shuffledCards);
    setTurns(0);
    // console.log(card.src)
  };

  return (
    <div className="game-wrapper">
      <button className="border" onClick={shuffleCards}>
        Shuffle Cards
      </button>
      Memory game
      <div className="grid-cards">
        {cards.map((card) => (
          <div key={card.id}>
            <img
              src={card.src}
              alt="front-card"
              className="front-card w-20 first-line:h-20"
            />
            <img
              src="question.png"
              alt="back-card"
              className="back-card w-40 first-line:h-20"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
