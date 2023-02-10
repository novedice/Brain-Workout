import { useState } from 'react';
import { getRandom } from '../../functions/random';
import { colors } from '../../functions/randomColor';
import { Timer } from '../Timer';

export const MeaningColorGame = () => {
  const [leftColor, setLeftColor] = useState(0);
  const [leftMeaningColor, setLeftMeaninfColor] = useState(0);
  const [rightColor, setRightColor] = useState(0);
  const [rightMeaningColor, setRightMeamingColor] = useState(0);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(20);
  const [howToPlay, setHowToPlay] = useState(true);

  const changeColors = () => {
    setLeftColor(getRandom(0, colors.length - 1));
    setLeftMeaninfColor(getRandom(0, colors.length - 1));
    setRightColor(getRandom(0, colors.length - 1));
    setRightMeamingColor(getRandom(0, colors.length - 1));
  };

  const startGame = () => {
    setScore(0);
    setSeconds(20);
    setFinished(false);
    setStarted(true);
    setSeconds(20);
    changeColors();
  };

  const gameFinish = () => {
    localStorage.setItem('score', score.toString());
    // console.log('gameFinish');
    // console.log('local storage:', localStorage.getItem('score'));
    setFinished(false);
    // setFinished(false);
  };

  const noAnswer = () => {
    if (leftMeaningColor !== rightColor) {
      setScore((prev) => (prev += 100));
    }
    changeColors();
  };
  const yesAnswer = () => {
    if (leftMeaningColor === rightColor) {
      setScore((prev) => (prev += 100));
    }
    changeColors();
  };
  if (finished) {
    setFinished(false);
    gameFinish();
  }

  return (
    <>
      <div className="game-wrapper flex h-full w-full flex-col">
        {howToPlay && (
          <>
            <div className="flex h-full flex-col justify-around">
              <div className="how-to-play flex flex-col">
                <p className="mb-5 text-center text-xl">
                  Ignore meaning of the word at the right and focus just on its
                  color
                </p>
                <div className="inside-wrap flex h-full flex-col justify-around">
                  <div className="flex justify-center">
                    <div
                      className={`left-part mr-5 flex h-[100px] w-[35%] justify-center border-2 ${colors[leftColor].border} align-middle `}
                    >
                      <p
                        className={`flex  items-center justify-center text-center text-5xl uppercase ${colors[leftColor].color}`}
                      >
                        {colors[leftMeaningColor].meaning}
                      </p>
                    </div>
                    <div
                      className={`left-part border- flex h-[100px] w-[35%] justify-center border-2  ${colors[rightColor].border} align-middle `}
                    >
                      <p
                        className={`flex items-center justify-center text-center text-5xl uppercase ${colors[rightColor].color}`}
                      >
                        ----
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="buttons flex w-[100%] justify-center">
                <button
                  className="mr-3 h-[50px] w-[80px] border bg-blue-400"
                  onClick={noAnswer}
                  disabled={!started}
                >
                  NO
                </button>
                <button
                  className="h-[50px] w-[80px] border bg-blue-400"
                  onClick={yesAnswer}
                  disabled={!started}
                >
                  YES
                </button>
              </div>
              <button
                onClick={() => setHowToPlay(false)}
                className="mr-3 h-[50px] w-[150px] border bg-blue-400"
              >
                PLAY
              </button>
            </div>
          </>
        )}
        {!howToPlay && (
          <>
            <div className="head-game flex self-end">
              <button
                className="m-5"
                onClick={() => {
                  if (!started) {
                    startGame();
                  } else {
                    setStarted(false);
                  }
                }}
              >
                {started ? 'STOP' : 'START'}
              </button>
              <button className="m-5" onClick={() => setPaused(!paused)}>
                {paused ? 'PLAY' : 'PAUSE'}
              </button>
              <div className="m-5">
                <Timer
                  seconds={seconds}
                  started={started}
                  paused={paused}
                  finished={finished}
                  setFinished={setFinished}
                  setStarted={setStarted}
                  setSeconds={setSeconds}
                />
              </div>
              <p className="m-5">SCORE: {score}</p>
            </div>
            <div className="inside-wrap flex h-full flex-col justify-around">
              <div className="flex justify-center">
                <div
                  className={`left-part mr-5 flex h-[100px] w-[35%] justify-center border-2 ${colors[leftColor].border} align-middle `}
                >
                  <p
                    className={`flex  items-center justify-center text-center text-5xl uppercase ${colors[leftColor].color}`}
                  >
                    {colors[leftMeaningColor].meaning}
                  </p>
                </div>
                <div
                  className={`left-part border- flex h-[100px] w-[35%] justify-center border-2  ${colors[rightColor].border} align-middle `}
                >
                  <p
                    className={`flex items-center justify-center text-center text-5xl uppercase ${colors[rightColor].color}`}
                  >
                    {colors[rightMeaningColor].meaning}
                  </p>
                </div>
              </div>
            </div>
            <div className="buttons flex w-[100%] justify-center">
              <button
                className="mr-3 h-[50px] w-[80px] border bg-blue-400"
                onClick={noAnswer}
                disabled={!started}
              >
                NO
              </button>
              <button
                className="h-[50px] w-[80px] border bg-blue-400"
                onClick={yesAnswer}
                disabled={!started}
              >
                YES
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
