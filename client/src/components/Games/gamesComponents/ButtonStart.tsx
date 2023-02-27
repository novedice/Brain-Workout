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
            ? 'mt-2 rounded-full border px-4 text-xl hover:bg-red-200'
            : 'mr-3 flex h-[50px] w-[150px] items-center justify-around self-center rounded-lg border-8 border-blue-300  bg-gray-200 align-middle'
        }
        //  mr-3 h-[50px] w-[150px] self-center rounded-lg border-8 border-blue-300 bg-gray-200"
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
