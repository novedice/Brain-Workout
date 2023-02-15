import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getRandom } from '../../../functions/random';
import { colors } from '../../../functions/randomColor';
import { Timer } from '../../Timer';
import { ButtonPause } from '../gamesComponents/ButtonPause';
import { ButtonStart } from '../gamesComponents/ButtonStart';
import { ButtonYesNo } from '../gamesComponents/ButtonYesNo';
import { FinishGameTable } from '../gamesComponents/FinishGameTable';
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
  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [multiple, setMultiple] = useState(1);

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
    // setFinished(false);
  };

  const noAnswer = () => {
    if (leftMeaningColor !== rightColor) {
      setScore(score + 50 * multiple);
      setRightAnswers(rightAnswers + 1);
      setMultiple(multiple === 10 ? 10 : multiple + 1);
      setBackColor('bg-green-500');
      setTimeout(() => setBackColor(''), 100);
    } else {
      setBackColor('bg-red-500');
      setWrongAnswers(wrongAnswers + 1);
      setMultiple(1);
      setTimeout(() => setBackColor(''), 100);
    }
    changeColors();
  };

  const yesAnswer = () => {
    if (leftMeaningColor === rightColor) {
      setScore(score + 50 * multiple);
      setRightAnswers(rightAnswers + 1);
      setMultiple(multiple === 10 ? 10 : multiple + 1);
      setBackColor('bg-green-500');
      setTimeout(() => setBackColor(''), 100);
    } else {
      setWrongAnswers(wrongAnswers + 1);
      setMultiple(1);
      setBackColor('bg-red-500');
      setTimeout(() => setBackColor(''), 100);
    }
    changeColors();
  };

  if (finished) {
    gameFinish();
  }

  return (
    <>
      <div
        className={`game-wrap mr-auto ml-auto flex h-full w-[90%] flex-col align-middle `}
      >
        {finished && (
          <FinishGameTable
            score={score}
            rightAnswers={rightAnswers}
            wrongAnswers={wrongAnswers}
            speed={0}
            started={started}
            setStarted={setStarted}
            startGame={startGame}
            gameID={'color_match'}
          />
        )}
        {howToPlay && (
          <ColorDemo howToPlay={howToPlay} setHowToPlay={setHowToPlay} />
        )}
        {!howToPlay && !finished && (
          <>
            <div className="head-game width-[100%] flex self-end">
              <ButtonStart
                started={started}
                setStarted={setStarted}
                startGame={startGame}
              />
              <ButtonPause paused={paused} setPaused={setPaused} />
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

              <p className="m-5">
                <FormattedMessage id="score" values={{ n: score }} />
              </p>
              <p className="border-blue flex h-[50px] w-[50px] items-center justify-center rounded-full border-4 border-blue-300">{`x${multiple}`}</p>
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
                <ButtonYesNo callback={noAnswer} disabled={!started} val="no" />
                <ButtonYesNo
                  callback={yesAnswer}
                  disabled={!started}
                  val="yes"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
