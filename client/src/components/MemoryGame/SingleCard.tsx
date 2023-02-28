import './SingleCard.css';
import { ICards } from './types';

interface ISingleCardProp {
  card: ICards;
  handleSelect: (card: ICards) => void;
  flip: boolean | undefined;
  disabled: boolean;
}

export default function SingleCard({
  card,
  handleSelect,
  flip,
  disabled,
}: ISingleCardProp) {
  const handleClick = () => {
    if (!disabled) {
      handleSelect(card);
    }
  };
  return (
    <div className="card">
      <div className={flip ? 'flipped' : 'shake'}>
        <img
          src={card.src}
          alt="front-card"
          className="front-card w-20 first-line:h-20"
        />
        <img
          src="question.png"
          alt="back-card"
          className="back-card w-20 first-line:h-20"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
