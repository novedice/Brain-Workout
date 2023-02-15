interface IButtonStartProps {
  started: boolean;
  setStarted: React.Dispatch<React.SetStateAction<boolean>>;
  startGame: () => void;
}

export const ButtonStart = ({
  started,
  setStarted,
  startGame,
}: IButtonStartProps) => {
  return (
    <>
      <button
        className="mr-3 h-[50px] w-[150px] self-center rounded-lg border-8 border-blue-300 bg-white"
        onClick={() => {
          if (!started) {
            startGame();
            setStarted(true);
          } else {
            setStarted(false);
          }
        }}
      >
        {started ? 'STOP' : 'START'}
      </button>
    </>
  );
};
