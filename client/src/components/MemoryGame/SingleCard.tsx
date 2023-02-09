import './SingleCard.css';
export default function SingleCard({ card, handleSelect }: any) {
  const handleClick = () => {
    handleSelect(card);
  };
  return (
    <div className="card">
      <div>
        <img
          src={card.src}
          alt="front-card"
          className="card front-card w-20 first-line:h-20"
        />
        <img
          src="question.png"
          alt="back-card"
          className="card back-card w-40 first-line:h-20"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
