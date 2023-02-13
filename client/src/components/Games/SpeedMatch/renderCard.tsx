import { ICardSpeedMacth } from '../../../types/interfaces';
// import { cards } from './cards';

interface ISpeedMatchCardProps {
  card: ICardSpeedMacth;
}
export const SpeedMatchCard = ({ card }: ISpeedMatchCardProps) => {
  return (
    <>
      <div
        className="speed-match-card bg h-[200px]  w-[200px] border-4 border-sky-700"
        key={card.name}
      >
        <img
          className="h-auto w-[200px] bg-white"
          src={`${card.src}`}
          alt={`${card.name}`}
        ></img>
      </div>
    </>
  );
};
