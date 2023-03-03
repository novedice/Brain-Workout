import { useRef, useState } from 'react';
import './ReactionTime.css';
import '../../../assets/clock.png';
import '../../../assets/lightning.png';
import { IGameProps } from '../../../types/interfaces';
import { FormattedMessage } from 'react-intl';
import { StatusGameType } from '../../../types/types';
import { FinishGameTable } from '../gamesComponents/FinishGameTable';
import { PrestartWindow } from '../gamesComponents/PrestartWindow';

enum ScreenType {
  StartGame = 1,
  WaitClick = 2,
  Click = 3,
  ClickResult = 4,
  TotalResult = 5,
  MissClick = 6,
}

const TOTAL_ROUNDS = 5;

export function ReactionTime({ gameId, srcEn, srcRus }: IGameProps) {
  const timeoutRef = useRef<any>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [currentScreen, setCurrentScreen] = useState(ScreenType.StartGame);
  const [resultArray, setResultArray] = useState<number[]>([]);
  const [statusGame, setStatusGame] = useState<StatusGameType>('Wait');

  const getRandomTime = (min: number, max: number) => {
    let result = Math.floor(Math.random() * Math.floor(max)) + min;
    result = result * 1000;
    return result;
  };

  const gameStart = () => {
    setStatusGame('Started');
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

  const saveResult = () => {
    localStorage.setItem(
      'bestReactionScore',
      JSON.stringify(
        resultArray.reduce((acc, elem) => (acc < elem ? acc : elem))
      )
    );
  };

  const checkNextRound = () => {
    if (resultArray.length === TOTAL_ROUNDS) {
      setStatusGame('Finished');
      setCurrentScreen(ScreenType.TotalResult);
      saveResult();
    } else {
      timeoutRef.current = setTimeout(() => {
        setCurrentScreen(ScreenType.Click);
        setTime(new Date());
      }, getRandomTime(1, 5));
      setCurrentScreen(ScreenType.WaitClick);
    }
  };

  const newGame = () => {
    setStatusGame('Started');
    setResultArray([]);
    setCurrentScreen(ScreenType.StartGame);
  };

  const wrongClicked = () => {
    clearTimeout(timeoutRef.current);
    setCurrentScreen(ScreenType.MissClick);
  };

  return (
    <div className="container">
      {currentScreen === ScreenType.StartGame && (
        <PrestartWindow
          startGame={gameStart}
          setStatusGame={setStatusGame}
          gameName={'reaction_time_test'}
          statusGame={statusGame}
          gameDescription="reaction_time_description"
          gameImgRus={srcRus}
          gameImgEn={srcEn}
        />
      )}
      {/* {currentScreen === ScreenType.StartGame && (
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
      )} */}
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
          <FinishGameTable
            score={resultArray.reduce((acc, elem) => (acc < elem ? acc : elem))}
            speed={0}
            startGame={newGame}
            statusGame={statusGame}
            setStatusGame={setStatusGame}
            rightAnswers={0}
            totalAnswers={0}
            gameID={gameId}
            gameName={'reaction_time_test'}
            resultsName="your_best_reaction_time"
          />
        </div>
      )}
    </div>
  );
}
