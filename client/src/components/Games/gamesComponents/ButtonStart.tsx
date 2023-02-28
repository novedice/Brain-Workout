import { FormattedMessage } from 'react-intl';
import { StatusGameType } from '../../../types/types';
import './finishGameTable.css';

interface IButtonStartProps {
  statusGame: StatusGameType;
  setStatusGame: React.Dispatch<React.SetStateAction<StatusGameType>>;
  startGame: () => void;
  startName?: string;
}

export const ButtonStart = ({
  statusGame,
  setStatusGame,
  startGame,
  startName = 'start',
}: IButtonStartProps) => {
  return (
    <>
      <button
        className={
          statusGame === 'Finished'
            ? 'mt-2 h-[40px] w-[100px] rounded-full border px-4 text-[24px] hover:bg-red-200'
            : 'mr-3 flex h-[40px] w-[150px] items-center justify-around self-center rounded-lg  bg-gray-300 align-middle duration-300 hover:bg-red-200'
        }
        onClick={() => {
          if (statusGame !== 'Started') {
            startGame();
            setStatusGame('Started');
          } else {
            setStatusGame('Finished');
          }
        }}
      >
        {statusGame === 'Started' ? (
          <FormattedMessage id="stop" />
        ) : (
          <FormattedMessage id={startName} />
        )}
      </button>
    </>
  );
};
