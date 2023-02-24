import { FormattedMessage } from 'react-intl';

interface IButtonStartAgainProps {
  // started: boolean;
  setStarted: React.Dispatch<React.SetStateAction<boolean>>;
  startGame: () => void;
  // paused: boolean;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonStartAgain = ({
  // started,
  setStarted,
  startGame,
  setPaused,
}: // paused,
IButtonStartAgainProps) => {
  return (
    <>
      <button
        className="mr-3 h-[50px] w-[150px] self-center rounded-lg border-8 border-blue-300 bg-gray-200"
        onClick={() => {
          setStarted(true);
          setPaused(false);
          startGame();
        }}
      >
        <FormattedMessage id="start_again" />
      </button>
    </>
  );
};
