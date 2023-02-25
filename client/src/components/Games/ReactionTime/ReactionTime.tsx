import { useRef, useState } from 'react';
import './ReactionTime.css';
import '../../../assets/clock.png';
import '../../../assets/lightning.png';
import { IGameProps } from '../../../types/interfaces';
import { FormattedMessage } from 'react-intl';

enum ScreenType {
  StartGame = 1,
  WaitClick = 2,
  Click = 3,
  ClickResult = 4,
  TotalResult = 5,
  MissClick = 6,
}

const TOTAL_ROUNDS = 5;

export function ReactionTime({ gameId }: IGameProps) {
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
    console.log(gameId);
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
            <FormattedMessage id="reaction_time_test" />
          </h1>
          <h2>
            <FormattedMessage id="reaction_time_description" />
          </h2>
          <h3>
            <FormattedMessage id="click_for_start" />
          </h3>
        </div>
      )}
      {currentScreen === ScreenType.WaitClick && (
        <div
          className="click-area time-container"
          style={{ background: 'red' }}
          onClick={() => wrongClicked()}
        >
          <p className="click-text">
            <FormattedMessage id="wait_for_green" />
          </p>
        </div>
      )}
      {currentScreen === ScreenType.MissClick && (
        <div
          className="click-area time-container"
          style={{ background: 'rgb(59 130 246 / 0.5)' }}
          onClick={() => gameStart()}
        >
          <div className="flex flex-col items-center">
            <p className="click-text">
              <FormattedMessage id="too_soon" />
            </p>
            <p className="click-text">
              <FormattedMessage id="click_to_try_again" />
            </p>
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
              <FormattedMessage
                id="your_reaction_time"
                values={{ n: resultArray[resultArray.length - 1] }}
              />
            </p>
            <p></p>
            <p className="small-text">
              <FormattedMessage id="click_to_keep_going" />
            </p>
          </div>
        </div>
      )}
      {currentScreen === ScreenType.TotalResult && (
        <div
          className="click-area time-container"
          style={{ background: 'rgb(59 130 246 / 0.5)' }}
        >
          <p>
            <FormattedMessage
              id="your_best_reaction_time"
              values={{
                n: resultArray.reduce((acc, elem) => (acc < elem ? acc : elem)),
              }}
            />
            {/* You best reaction time:{' '}
            {resultArray.reduce((acc, elem) => (acc < elem ? acc : elem))} ms */}
          </p>
          <button
            className="mt-2 rounded-full border px-4 text-xl hover:bg-red-200"
            onClick={() => newGame()}
          >
            <FormattedMessage id="try_again" />
          </button>
          <button
            className="m-2 rounded-full border px-4 text-xl hover:bg-red-200"
            onClick={() => saveResult()}
          >
            <FormattedMessage id="save_result" />
          </button>
        </div>
      )}
    </div>
  );
}
