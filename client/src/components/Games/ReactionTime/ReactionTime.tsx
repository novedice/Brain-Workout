import { useRef, useState } from 'react';
import './ReactionTime.css';
import '../../../assets/clock.png';
import '../../../assets/lightning.png';

enum ScreenType {
  StartGame = 1,
  WaitClick = 2,
  Click = 3,
  ClickResult = 4,
  TotalResult = 5,
  MissClick = 6,
}

const TOTAL_ROUNDS = 5;

export function ReactionTime() {
  const timeoutRef = useRef<any>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [currentScreen, setCurrentScreen] = useState(ScreenType.StartGame);
  const [resultArray, setResultArray] = useState<number[]>([]);

  const getRandomTime = (min: number, max: number) => {
    let result = Math.floor(Math.random() * Math.floor(max)) + min;
    result = result * 1000;
    return result;
  };

  const gameStart = () => {
    setCurrentScreen(ScreenType.WaitClick);
    timeoutRef.current = setTimeout(() => {
      setCurrentScreen(ScreenType.Click);
      setTime(new Date());
    }, getRandomTime(1, 5));
  };

  const HandleClick = () => {
    const clickDate = new Date();

    const timeStart = time!.getTime();
    const timeClick = clickDate.getTime();

    setResultArray((prevState) => [...prevState, timeClick - timeStart]);
    setCurrentScreen(ScreenType.ClickResult);
  };

  const checkNextRound = () => {
    if (resultArray.length === TOTAL_ROUNDS) {
      setCurrentScreen(ScreenType.TotalResult);
    } else {
      timeoutRef.current = setTimeout(() => {
        setCurrentScreen(ScreenType.Click);
        setTime(new Date());
      }, getRandomTime(1, 5));
      setCurrentScreen(ScreenType.WaitClick);
    }
  };

  const newGame = () => {
    setResultArray([]);
    setCurrentScreen(ScreenType.StartGame);
  };

  const wrongClicked = () => {
    clearTimeout(timeoutRef.current);
    setCurrentScreen(ScreenType.MissClick);
  };

  const saveResult = () => {
    localStorage.setItem(
      'bestReactionScore',
      JSON.stringify(
        resultArray.reduce((acc, elem) => (acc < elem ? acc : elem))
      )
    );
  };

  return (
    <div className="container">
      {currentScreen === ScreenType.StartGame && (
        <div
          className="click-area time-container"
          style={{ background: 'rgb(59 130 246 / 0.5)' }}
          onClick={() => gameStart()}
        >
          <h1 className="flex items-center">
            <img src="lightning.png" alt="121" width={100} className="mb-5" />{' '}
            Reaction Time Test
          </h1>
          <h2>When the red box turns green, click as quickly as you can.</h2>
          <h3>Click for starting game</h3>
        </div>
      )}
      {currentScreen === ScreenType.WaitClick && (
        <div
          className="click-area time-container"
          style={{ background: 'red' }}
          onClick={() => wrongClicked()}
        >
          <p className="click-text">Wait for green...</p>
        </div>
      )}
      {currentScreen === ScreenType.MissClick && (
        <div
          className="click-area time-container"
          style={{ background: 'rgb(59 130 246 / 0.5)' }}
          onClick={() => gameStart()}
        >
          <div className="flex flex-col items-center">
            <p className="click-text">To soon!</p>
            <p className="click-text">Click to try again!</p>
          </div>
        </div>
      )}
      {currentScreen === ScreenType.Click && (
        <div
          className="click-area"
          style={{ background: 'rgb(75, 219, 106)' }}
          onClick={HandleClick}
        >
          <p className="click-text">Click!</p>
        </div>
      )}
      {currentScreen === ScreenType.ClickResult && (
        <div
          className="click-area"
          style={{ background: 'blue' }}
          onClick={checkNextRound}
        >
          <div className="time-container">
            <img src="clock.png" alt="121" className="mb-5" />
            <p>
              Your reaction time: {resultArray[resultArray.length - 1] + ' ms'}
            </p>
            <p></p>
            <p className="small-text">Click to keep going</p>
          </div>
        </div>
      )}
      {currentScreen === ScreenType.TotalResult && (
        <div
          className="click-area time-container"
          style={{ background: 'rgb(59 130 246 / 0.5)' }}
        >
          <p>
            You best reaction time:{' '}
            {resultArray.reduce((acc, elem) => (acc < elem ? acc : elem))} ms
          </p>
          <button
            className="mt-2 rounded-full border px-4 text-xl hover:bg-red-200"
            onClick={() => newGame()}
          >
            Try again
          </button>
          <button
            className="m-2 rounded-full border px-4 text-xl hover:bg-red-200"
            onClick={() => saveResult()}
          >
            Save score
          </button>
        </div>
      )}
    </div>
  );
}
