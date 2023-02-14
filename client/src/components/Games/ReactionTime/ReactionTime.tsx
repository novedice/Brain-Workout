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

  const getRandomTime = (min: number, max: number) => {
    let result = Math.floor(Math.random() * Math.floor(max)) + min;
    result = result * 1000;
    console.log(result);

    return result;
  };

  const HandleClick = () => {
    let timeTwo = new Date();
    let timeClick = timeTwo.getTime();
    setSecondTime(timeClick);
    setResults(true);
    setGameClicked(false);
    // setTimeout(() => {
    //
    // }, 3000);
    // let differentTime = timeClick - timeNow;
    // console.log(timeNow);

    // console.log(differentTime);
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
      // console.log('First click ' + timeNow);
    }, time);
  };

  let differentTime = secondTime - firstTime;

  const gameStart = () => {
    let timeChange = getRandomTime(1, 8);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let endTime = timeChange + 5000;
    setGameStatus(true);
    timeoutOne(timeChange);
    setDefaultGameState(false);
    setGameClicked(false);
    // timeoutTwo(endTime);
  };

  const [arr, setArr] = useState<number[]>([]);

  const resultArrayFunc = () => {
    setArr([...arr, differentTime]);
  };

  console.log(arr);

  const resetGame = () => {
    gameStart();
    setDefaultGameState(false);
    setResults(false);
    setGameStatus(true);
    resultArrayFunc();
    if (arr.length === 2) {
      let bestScore = arr.reduce((acc, elem) => (acc < elem ? acc : elem));
      console.log(bestScore);
    }
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
        >
          <p>Waiting for green...</p>
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
      {/* <button className="mt-2 border px-2" onClick={() => gameStart()}>
      Start Game
      </button>  */}
    </div>
  );
}
