import { useState } from 'react';
import './ReactionTime.css';
import '../../../assets/clock.png';

export function ReactionTime() {
  const [defaultGameState, setDefaultGameState] = useState(true);
  const [gameStatus, setGameStatus] = useState(false);
  const [gameClicked, setGameClicked] = useState(false);
  const [firstTime, setFirstTime] = useState(0);
  const [secondTime, setSecondTime] = useState(0);
  const [results, setResults] = useState(false);
  const [totalResult, setTotalResult] = useState(false);
  const [resultArray, setResultArray] = useState<number[]>([]);
  const [bestScore, setBestScore] = useState(0);
  const [wrongClick, setWrongClick] = useState(0 || '');

  const getRandomTime = (min: number, max: number) => {
    let result = Math.floor(Math.random() * Math.floor(max)) + min;
    result = result * 1000;
    return result;
  };

  const timeoutOne = (time: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const timeout = setTimeout(() => {
      setGameClicked(true);
      setGameStatus(false);
      setDefaultGameState(false);
      let timeOne = new Date();
      let timeNow = timeOne.getTime();
      setFirstTime(timeNow);
    }, time);
  };
  console.log(firstTime);

  let differentTime = secondTime - firstTime;
  // let wrongClick = secondTime - firstTime;

  const gameStart = () => {
    let timeChange = getRandomTime(1, 8);
    setGameStatus(true);
    timeoutOne(timeChange);
    setDefaultGameState(false);
    setGameClicked(false);
    setTotalResult(false);
  };

  const HandleClick = () => {
    let timeTwo = new Date();
    let timeClick = timeTwo.getTime();
    setSecondTime(timeClick);
    setResults(true);
    setGameClicked(false);
  };

  const gameStop = () => {
    setResultArray([]);
    setTotalResult(true);
    setGameStatus(false);
    setGameClicked(false);
  };

  const resetGame = () => {
    gameStart();
    setGameStatus(true);
    setResults(false);
    setDefaultGameState(false);
    setWrongClick('');
    setResultArray([...resultArray, differentTime]);
    if (resultArray.length === 2) {
      setBestScore(
        resultArray.reduce((acc, elem) => (acc < elem ? acc : elem))
      );
      gameStop();
    }
  };

  const newGame = () => {
    setResultArray([]);
    gameStart();
  };

  const wrongClicked = () => {
    let timeTwo = new Date();
    let timeWrongClick = timeTwo.getTime();
    setWrongClick(timeWrongClick.toString());
    setResults(false);
    setGameClicked(false);
  };

  const saveResult = () => {
    localStorage.setItem('bestReactionScore', JSON.stringify(bestScore));
  };

  return (
    <div className="container">
      <h1>Reaction Time Speed Game</h1>
      <p>
        Click the area after the color changed to{' '}
        <label className="green-label">GREEN</label>
      </p>
      {defaultGameState && (
        <div
          className="click-area time-container"
          style={{ background: 'rgb(59 130 246 / 0.5)' }}
          onClick={() => gameStart()}
        >
          <p>Click for starting game</p>
        </div>
      )}
      {gameStatus && (
        <div
          className="click-area time-container"
          style={{ background: 'red' }}
          onClick={() => wrongClicked()}
        >
          {wrongClick && (
            <div className="flex flex-col items-center">
              <p className="click-text">To soon!</p>
              <p className="click-text">Waiting for green please...</p>
            </div>
          )}

          {!wrongClick && <p className="click-text">Waiting for green...</p>}
        </div>
      )}
      {gameClicked && (
        <div
          className="click-area"
          style={{ background: 'rgb(75, 219, 106)' }}
          onClick={() => HandleClick()}
        >
          <p className="click-text">Click!</p>
        </div>
      )}
      {results && (
        <div
          className="click-area"
          style={{ background: 'blue' }}
          onClick={() => resetGame()}
        >
          <div className="time-container">
            <img src="clock.png" alt="121" className="mb-5" />
            <p>
              Your reaction time:{' '}
              {differentTime > 0 ? differentTime + ' ms' : ''}
            </p>
            <p></p>
            <p className="small-text">Click to keep going</p>
          </div>
        </div>
      )}

      {totalResult && (
        <div
          className="click-area time-container"
          style={{ background: 'rgb(59 130 246 / 0.5)' }}
          // onClick={() => setDefaultGameState(true)}
        >
          <p>You best time: {bestScore} ms</p>
          <button
            className="mt-2 rounded-full border px-4 text-xl hover:bg-red-200"
            onClick={() => newGame()}
          >
            Start New Game
          </button>
          <button
            className="m-2 rounded-full border px-4 text-xl hover:bg-red-200"
            onClick={() => saveResult()}
          >
            Save result
          </button>
        </div>
      )}
    </div>
  );
}
