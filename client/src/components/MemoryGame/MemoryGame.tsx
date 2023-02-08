import React from 'react';
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
  { src: 'question.png' },
  { src: 'rectangle.png' },
  { src: 'square.png' },
  { src: 'trapezoid.png' },
  { src: 'triangle.png' },
];

export function MemoryGame() {
  return (
    <>
      <div className="h-32 w-32">
        Memory game{' '}
        <img src={`${CARD_IMAGES[0].src}`} alt="" className="h-20 w-20" />
        <img src={`${CARD_IMAGES[1].src}`} alt="" className="h-20 w-20" />
        <img src={`${CARD_IMAGES[2].src}`} alt="" className="h-20 w-20" />
        {/* <img src="circle.png" alt="122" /> */}
      </div>
    </>
  );
}
