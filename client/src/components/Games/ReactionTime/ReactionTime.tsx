import { useState } from 'react';
import './ReactionTime.css';

export function ReactionTime() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [defaultGameState, setDefaultGameState] = useState(true);
  const [gameStatus, setGameStatus] = useState(false);
  const [gameClicked, setGameClicked] = useState(false);
  const [firstTime, setFirstTime] = useState(0);
  const [secondTime, setSecondTime] = useState(0);

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
    setTimeout(() => {
      setDefaultGameState(true);
      setGameClicked(false);
    }, 3000);
    // let differentTime = timeClick - timeNow;
    // console.log(timeNow);

    // console.log(differentTime);
  };
  // let click = HandleClick();
  // console.log('Second click ' + click);

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

  return (
    <div className="container">
      <h1>Reaction Time Speed Game</h1>
      <p>
        Click the area after the color changed to{' '}
        <label className="green-label">GREEN</label>
      </p>
      {defaultGameState && (
        <div className="click-area" style={{ background: 'yellow' }}></div>
      )}
      {gameStatus && (
        <div className="click-area" style={{ background: 'red' }}></div>
      )}
      {gameClicked && (
        <div
          className="click-area"
          style={{ background: 'green' }}
          onClick={() => HandleClick()}
        ></div>
      )}
      {/* <div className={green ? 'click-area_green' : ''}></div> */}
      <div className="time-container">
        <p>Your reaction time: </p>
        <p>{differentTime > 0 ? differentTime : 0}</p>
      </div>
      <button className="mt-2 border px-2" onClick={() => gameStart()}>
        Start Game
      </button>
    </div>
  );
}
