// import { useState } from 'react';
// import './ReactionTime.css';
// import '../../../assets/clock.png';

// export function ReactionTime() {
//   const [defaultGameState, setDefaultGameState] = useState(true);
//   const [gameStatus, setGameStatus] = useState(false);
//   const [gameClicked, setGameClicked] = useState(false);
//   const [firstTime, setFirstTime] = useState(0);
//   const [secondTime, setSecondTime] = useState(0);
//   const [results, setResults] = useState(false);
//   const [totalResult, setTotalResult] = useState(false);
//   const [resultArray, setResultArray] = useState<number[]>([]);
//   const [bestScore, setBestScore] = useState(0);
//   const [wrongClick, setWrongClick] = useState(0 || '');

//   const getRandomTime = (min: number, max: number) => {
//     let result = Math.floor(Math.random() * Math.floor(max)) + min;
//     result = result * 1000;
//     return result;
//   };

//   const timeoutOne = (time: number) => {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const timeout = setTimeout(() => {
//       setGameClicked(true);
//       setGameStatus(false);
//       setDefaultGameState(false);
//       let timeOne = new Date();
//       let timeNow = timeOne.getTime();
//       setFirstTime(timeNow);
//     }, time);
//   };
//   console.log(firstTime);

//   let differentTime = secondTime - firstTime;
//   // let wrongClick = secondTime - firstTime;

//   const gameStart = () => {
//     let timeChange = getRandomTime(1, 2);
//     setGameStatus(true);
//     timeoutOne(timeChange);
//     setDefaultGameState(false);
//     setGameClicked(false);
//     setTotalResult(false);
//   };

//   const HandleClick = () => {
//     let timeTwo = new Date();
//     let timeClick = timeTwo.getTime();
//     setSecondTime(timeClick);
//     setResults(true);
//     setGameClicked(false);
//   };

//   const gameStop = () => {
//     // setResultArray([]);
//     setTotalResult(true);
//     setGameStatus(false);
//     setGameClicked(false);
//   };

//   const resetGame = () => {
//     setGameStatus(true);
//     setResults(false);
//     setDefaultGameState(false);
//     setWrongClick('');
//     setResultArray([...resultArray, differentTime]);
//     if (resultArray.length === 2) {
//       setBestScore(
//         resultArray.reduce((acc, elem) => (acc < elem ? acc : elem))
//       );

//       gameStop();
//     } else {
//       gameStart();
//     }
//   };

//   console.log(resultArray);

//   const newGame = () => {
//     setResultArray([]);
//     gameStart();
//   };

//   const wrongClicked = () => {
//     let timeTwo = new Date();
//     let timeWrongClick = timeTwo.getTime();
//     setWrongClick(timeWrongClick.toString());
//     setResults(false);
//     setGameClicked(false);
//   };

//   const saveResult = () => {
//     localStorage.setItem('bestReactionScore', JSON.stringify(bestScore));
//   };

//   return (
//     <div className="container">
//       <h1>Reaction Time Speed Game</h1>
//       <p>
//         Click the area after the color changed to{' '}
//         <label className="green-label">GREEN</label>
//       </p>
//       {defaultGameState && (
//         <div
//           className="click-area time-container"
//           style={{ background: 'rgb(59 130 246 / 0.5)' }}
//           onClick={() => gameStart()}
//         >
//           <p>Click for starting game</p>
//         </div>
//       )}
//       {gameStatus && (
//         <div
//           className="click-area time-container"
//           style={{ background: 'red' }}
//           onClick={() => wrongClicked()}
//         >
//           {wrongClick && (
//             <div className="flex flex-col items-center">
//               <p className="click-text">To soon!</p>
//               <p className="click-text">Waiting for green please...</p>
//             </div>
//           )}

//           {!wrongClick && <p className="click-text">Waiting for green...</p>}
//         </div>
//       )}
//       {gameClicked && (
//         <div
//           className="click-area"
//           style={{ background: 'rgb(75, 219, 106)' }}
//           onClick={() => HandleClick()}
//         >
//           <p className="click-text">Click!</p>
//         </div>
//       )}
//       {results && (
//         <div
//           className="click-area"
//           style={{ background: 'blue' }}
//           onClick={() => resetGame()}
//         >
//           <div className="time-container">
//             <img src="clock.png" alt="121" className="mb-5" />
//             <p>
//               Your reaction time:{' '}
//               {differentTime > 0 ? differentTime + ' ms' : ''}
//             </p>
//             <p></p>
//             <p className="small-text">Click to keep going</p>
//           </div>
//         </div>
//       )}

//       {totalResult && (
//         <div
//           className="click-area time-container"
//           style={{ background: 'rgb(59 130 246 / 0.5)' }}
//           // onClick={() => setDefaultGameState(true)}
//         >
//           <p>You best time: {bestScore} ms</p>
//           <button
//             className="mt-2 rounded-full border px-4 text-xl hover:bg-red-200"
//             onClick={() => newGame()}
//           >
//             Start New Game
//           </button>
//           <button
//             className="m-2 rounded-full border px-4 text-xl hover:bg-red-200"
//             onClick={() => saveResult()}
//           >
//             Save result
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
import { useRef, useState } from 'react';
import './ReactionTime.css';
import '../../../assets/clock.png';

enum ScreenType {
  StartGame = 1,
  WaitClick = 2,
  Click = 3,
  ClickResult = 4,
  TotalResult = 5,
  MissClick = 6,
}

const TOTAL_ROUNDS = 2;

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
    }, getRandomTime(1, 2));
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
      }, getRandomTime(1, 2));
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
      <h1>Reaction Time Speed Game</h1>
      <p>
        Click the area after the color changed to{' '}
        <label className="green-label">GREEN</label>
      </p>
      {currentScreen === ScreenType.StartGame && (
        <div
          className="click-area time-container"
          style={{ background: 'rgb(59 130 246 / 0.5)' }}
          onClick={() => gameStart()}
        >
          <p>Click for starting game</p>
        </div>
      )}
      {currentScreen === ScreenType.WaitClick && (
        <div
          className="click-area time-container"
          style={{ background: 'red' }}
          onClick={() => wrongClicked()}
        >
          <p className="click-text">Waiting for green...</p>
        </div>
      )}
      {currentScreen === ScreenType.MissClick && (
        <div
          className="click-area time-container"
          style={{ background: 'red' }}
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
            You best time:{' '}
            {resultArray.reduce((acc, elem) => (acc < elem ? acc : elem))} ms
          </p>
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
