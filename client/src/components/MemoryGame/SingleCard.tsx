import { ICards } from './MemoryGame';
import './SingleCard.css';

interface ISingleCardProp {
  card: ICards;
  handleSelect: (card: ICards) => void;
  flip: boolean | undefined;
}

export default function SingleCard({
  card,
  handleSelect,
  flip,
}: ISingleCardProp) {
  const handleClick = () => {
    handleSelect(card);
  };
  return (
    <div className="card">
      <div className={flip ? 'flipped' : ''}>
        <img
          src={card.src}
          alt="front-card"
          className="front-card w-20 first-line:h-20"
        />
        <img
          src="question.png"
          alt="back-card"
          className="back-card w-40 first-line:h-20"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
