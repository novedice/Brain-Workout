import { FormattedMessage } from 'react-intl';

interface IButtonStartProps {
  started: boolean;
  setStarted: React.Dispatch<React.SetStateAction<boolean>>;
  startGame: () => void;
  startName?: string;
}

export const ButtonStart = ({
  started,
  setStarted,
  startGame,
  startName = 'start',
}: IButtonStartProps) => {
  return (
    <>
      <button
        className="mr-3 h-[50px] w-[150px] self-center rounded-lg border-8 border-blue-300 bg-gray-200"
        onClick={() => {
          if (!started) {
            startGame();
            setStarted(true);
          } else {
            setStarted(false);
          }
        }}
      >
        {started ? (
          <FormattedMessage id="stop" />
        ) : (
          <FormattedMessage id={startName} />
        )}
      </button>
    </>
  );
};
