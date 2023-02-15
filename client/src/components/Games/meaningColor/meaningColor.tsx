import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getRandom } from '../../../functions/random';
import { colors } from '../../../functions/randomColor';
import { Timer } from '../../Timer';
import { ColorDemo } from './demoMeaning';
import './meaningColor.css';

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
  const [, setBackColor] = useState('');

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
    setFinished(false);
  };

  const noAnswer = async () => {
    if (leftMeaningColor !== rightColor) {
      setScore((prev) => (prev += 100));
      setBackColor('bg-green-500');
      setTimeout(() => setBackColor(''), 100);
    } else {
      setBackColor('bg-red-500');
      setTimeout(() => setBackColor(''), 100);
    }
    changeColors();
  };
  const yesAnswer = () => {
    if (leftMeaningColor === rightColor) {
      if (!howToPlay) {
        setScore((prev) => (prev += 100));
      }
      setBackColor('bg-green-500');
      setTimeout(() => setBackColor(''), 100);
    } else {
      setBackColor('bg-red-500');
      setTimeout(() => setBackColor(''), 100);
    }

    changeColors();
  };
  if (finished) {
    setFinished(false);
    gameFinish();
  }

  return (
    <>
      <div
        className={`game-wrap mr-auto ml-auto flex h-full w-[90%] flex-col align-middle `}
      >
        {howToPlay && (
          <ColorDemo howToPlay={howToPlay} setHowToPlay={setHowToPlay} />
        )}
        {!howToPlay && (
          <>
            <div className="head-game width-[100%] flex self-end">
              <button
                className="mr-3 h-[50px] w-[150px] self-center rounded-lg border bg-blue-300"
                onClick={() => {
                  if (!started) {
                    startGame();
                  } else {
                    setStarted(false);
                  }
                }}
              >
                {started ? (
                  <FormattedMessage id="stop" />
                ) : (
                  <FormattedMessage id="start" />
                )}
              </button>
              <button
                className="mr-3 h-[50px] w-[150px] self-center rounded-lg border bg-blue-300"
                onClick={() => setPaused(!paused)}
              >
                {paused ? (
                  <FormattedMessage id="play" />
                ) : (
                  <FormattedMessage id="pause" />
                )}
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
            <div className="inside-wrap flex h-full flex-col justify-center">
              <div className="mb-10 flex justify-center">
                <div
                  className={`left-part mr-5 flex h-[100px] w-[45%] justify-center border-4 ${colors[leftColor].border} align-middle `}
                >
                  <p
                    className={`flex  items-center justify-center text-center text-5xl uppercase ${colors[leftColor].color}`}
                  >
                    <FormattedMessage id={colors[leftMeaningColor].meaning} />
                  </p>
                </div>
                <div
                  className={`left-part  flex h-[100px] w-[45%] justify-center border-4  ${colors[rightColor].border} align-middle `}
                >
                  <p
                    className={`flex items-center justify-center text-center text-5xl uppercase ${colors[rightColor].color}`}
                  >
                    <FormattedMessage id={colors[rightMeaningColor].meaning} />
                  </p>
                </div>
              </div>
              <div className="buttons flex w-[100%] justify-center">
                <button
                  className="mr-3 h-[50px] w-[80px] rounded-lg border bg-blue-400"
                  onClick={noAnswer}
                  disabled={!started}
                >
                  <FormattedMessage id="no" />
                </button>
                <button
                  className="h-[50px] w-[80px] rounded-lg border bg-blue-400"
                  onClick={yesAnswer}
                  disabled={!started}
                >
                  <FormattedMessage id="yes" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
