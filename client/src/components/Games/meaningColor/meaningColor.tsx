import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getRandom } from '../../../functions/random';
import { colors } from '../../../functions/randomColor';
import { IGameProps } from '../../../types/interfaces';
import { StatusGameType } from '../../../types/types';
import { Timer } from '../../Timer';
import { ButtonPause } from '../gamesComponents/ButtonPause';
import { ButtonStart } from '../gamesComponents/ButtonStart';
import { ButtonYesNo } from '../gamesComponents/ButtonYesNo';
import { FinishGameTable } from '../gamesComponents/FinishGameTable';
import { GamePaused } from '../gamesComponents/PauseComponent';
import { PrestartWindow } from '../gamesComponents/PrestartWindow';
import { ColorDemo } from './demoMeaning';
import './meaningColor.css';

const GAME_DURATION = 20;

export const MeaningColorGame = ({ gameId, src }: IGameProps) => {
  const [leftColor, setLeftColor] = useState(0);
  const [leftMeaningColor, setLeftMeaninfColor] = useState(0);
  const [rightColor, setRightColor] = useState(0);
  const [rightMeaningColor, setRightMeamingColor] = useState(0);
  const [score, setScore] = useState(0);
  const [statusGame, setStatusGame] = useState<StatusGameType>('Wait');
  const [seconds, setSeconds] = useState(GAME_DURATION);
  const [howToPlay, setHowToPlay] = useState(false);
  const [, setBackColor] = useState('');
  const [rightAnswers, setRightAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [multiple, setMultiple] = useState(1);

  const changeColors = () => {
    setLeftColor(getRandom(0, colors.length - 1));
    setLeftMeaninfColor(getRandom(0, colors.length - 1));
    setRightColor(getRandom(0, colors.length - 1));
    setRightMeamingColor(getRandom(0, colors.length - 1));
  };

  const startGame = () => {
    setScore(0);
    setRightAnswers(0);
    setTotalAnswers(0);
    setSeconds(GAME_DURATION);
    setMultiple(1);
    setStatusGame('Started');
    changeColors();
  };

  const handleRightAnswer = () => {
    setBackColor('bg-green-500');
    setTimeout(() => setBackColor(''), 100);
    setScore(score + 50 * multiple);
    setRightAnswers(rightAnswers + 1);
    setTotalAnswers(totalAnswers + 1);
    setMultiple(multiple === 10 ? 10 : multiple + 1);
  };

  const handleWrongAnswer = () => {
    setBackColor('bg-red-500');
    setTimeout(() => setBackColor(''), 100);
    setTotalAnswers(totalAnswers + 1);
    setMultiple(1);
  };

  const noAnswer = () => {
    if (leftMeaningColor !== rightColor) {
      handleRightAnswer();
    } else {
      handleWrongAnswer();
    }
    changeColors();
  };

  const yesAnswer = () => {
    if (leftMeaningColor === rightColor) {
      handleRightAnswer();
    } else {
      handleWrongAnswer();
    }
    changeColors();
  };

  return (
    <>
      <div
        className={`game-wrap mr-auto ml-auto flex h-full w-[90%] flex-col align-middle `}
      >
        {statusGame === 'Wait' && !howToPlay && (
          <PrestartWindow
            startGame={startGame}
            setStatusGame={setStatusGame}
            gameName={'color_match'}
            statusGame={statusGame}
            gameDescription="choose color right"
            setHowToPlay={setHowToPlay}
            gameImg={src}
          />
        )}
        {statusGame === 'Finished' && (
          <FinishGameTable
            score={score}
            rightAnswers={rightAnswers}
            totalAnswers={totalAnswers}
            speed={0}
            statusGame={statusGame}
            setStatusGame={setStatusGame}
            startGame={startGame}
            gameName={'color_match'}
            gameID={gameId}
          />
        )}
        {howToPlay && (
          <ColorDemo
            howToPlay={howToPlay}
            setHowToPlay={setHowToPlay}
            setStatusGame={setStatusGame}
          />
        )}
        {!howToPlay && statusGame !== 'Finished' && statusGame !== 'Wait' && (
          <>
            {statusGame === 'Paused' && (
              <GamePaused
                statusGame={statusGame}
                setStatusGame={setStatusGame}
                startGame={startGame}
              />
            )}
            {statusGame !== 'Paused' && (
              <>
                <div className="head-game width-[100%] flex self-end">
                  <ButtonStart
                    statusGame={statusGame}
                    setStatusGame={setStatusGame}
                    startGame={startGame}
                  />
                  <ButtonPause
                    statusGame={statusGame}
                    setStatusGame={setStatusGame}
                  />
                  <div className="m-5">
                    <Timer
                      seconds={seconds}
                      statusGame={statusGame}
                      setStatusGame={setStatusGame}
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
                        <FormattedMessage
                          id={colors[leftMeaningColor].meaning}
                        />
                      </p>
                    </div>
                    <div
                      className={`left-part  flex h-[100px] w-[45%] justify-center border-4  ${colors[rightColor].border} align-middle `}
                    >
                      <p
                        className={`flex items-center justify-center text-center text-5xl uppercase ${colors[rightColor].color}`}
                      >
                        <FormattedMessage
                          id={colors[rightMeaningColor].meaning}
                        />
                      </p>
                    </div>
                  </div>
                  <div className="buttons flex w-[100%] justify-center">
                    <ButtonYesNo
                      callback={noAnswer}
                      disabled={statusGame !== 'Started'}
                      val="no"
                    />
                    <ButtonYesNo
                      callback={yesAnswer}
                      disabled={statusGame !== 'Started'}
                      val="yes"
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
