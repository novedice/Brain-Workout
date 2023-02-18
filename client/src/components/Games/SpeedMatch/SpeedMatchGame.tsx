import { cards } from './cards';
import './speedMatch.css';
import { SpeedMatchCard } from './renderCard';
import '../../../assets/speed-match-game/card-cover.jpeg';
import { ICardSpeedMacth, IGameProps } from '../../../types/interfaces';
import { useState } from 'react';
import { getRandom } from '../../../functions/random';
import { Timer } from '../../Timer';
import { ButtonStart } from '../gamesComponents/ButtonStart';
import '../../../assets/speed-match-game/pause.jpeg';
import '../../../assets/speed-match-game/play.png';
import { ButtonPause } from '../gamesComponents/ButtonPause';
import { FormattedMessage } from 'react-intl';
import { ButtonYesNo } from '../gamesComponents/ButtonYesNo';
import { FinishGameTable } from '../gamesComponents/FinishGameTable';

export const SpeedMatchGame = ({ gameId }: IGameProps) => {
  const [currentCard, setCurrentCard] = useState<ICardSpeedMacth>(cards[0]);
  const [prevCard, setPrevCard] = useState<ICardSpeedMacth>();
  const [nextCard, setNextCard] = useState<ICardSpeedMacth>(
    cards[getRandom(0, cards.length - 1)]
  );
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(10);
  const [finished, setFinished] = useState(false);
  const [changing, setChanging] = useState<'' | 'changing-front'>('');
  const [rightAnswers, setRightAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [multiple, setMultiple] = useState(1);
  const [backActive, setBackActive] = useState<'' | 'changing-back'>('');
  const [speed, setSpeed] = useState(0);
  const [beginAnswer, setBeginAnswer] = useState(new Date());

  const startGame = () => {
    setScore(0);
    setSeconds(20);
    setFinished(false);
    setStarted(true);
    setSpeed(0);
    setBeginAnswer(new Date());
  };

  const changeCards = async () => {
    setChanging('changing-front');
    setBackActive('changing-back');

    setTimeout(() => {
      setChanging('');
      setBackActive('');
      setPrevCard(currentCard);
      setCurrentCard(nextCard);
      setNextCard(cards[getRandom(0, cards.length - 1)]);
    }, 250);
  };

  const handleRightAnswer = () => {
    setScore(score + 50 * multiple);
    setRightAnswers(rightAnswers + 1);
    setTotalAnswers(totalAnswers + 1);
    setMultiple(multiple === 10 ? 10 : multiple + 1);
  };

  const handleWrongAnswer = () => {
    setTotalAnswers(totalAnswers + 1);
    setMultiple(1);
  };

  const yesAnswer = () => {
    if (prevCard === currentCard) {
      handleRightAnswer();
    } else {
      handleWrongAnswer();
    }
    setSpeed(speed + (+new Date() - +beginAnswer));
    changeCards();
    setBeginAnswer(new Date());
  };

  const noAnswer = () => {
    if (prevCard !== currentCard) {
      handleRightAnswer();
    } else {
      handleWrongAnswer();
    }
    setSpeed(speed + (+new Date() - +beginAnswer));
    changeCards();
    setBeginAnswer(new Date());
  };

  return (
    <>
      {finished && (
        <FinishGameTable
          score={score}
          rightAnswers={rightAnswers}
          totalAnswers={totalAnswers}
          speed={speed}
          startGame={startGame}
          started={started}
          setStarted={setStarted}
          gameName="speed_match"
          gameID={gameId}
          finished={finished}
        />
      )}
      {!finished && (
        <div className="flex w-full flex-col items-center">
          <div className="mb-[5%] flex w-full items-center justify-around">
            <ButtonStart
              startGame={startGame}
              setStarted={setStarted}
              started={started}
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
          <p>
            <FormattedMessage id="question_speed_match" />
          </p>
          <div className="cover flex">
            <div className="left-card">
              <SpeedMatchCard
                card={{ src: 'card-cover.jpeg', name: 'cover' }}
              />
            </div>
            <div className="right-card">
              <div className="card">
                <div
                  className={`card-front ${changing}`}
                  // className={`${changing} card-front ${frontActive} speed-match-card-container face`}
                >
                  <SpeedMatchCard card={currentCard} />
                </div>
                <div
                  className={`card-back ${backActive} `}
                  // className={`backpart card-back ${backActive}`}
                >
                  <SpeedMatchCard card={nextCard} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center align-middle">
            <ButtonYesNo val="no" callback={noAnswer} disabled={!started} />
            <ButtonYesNo val="yes" callback={yesAnswer} disabled={!started} />
          </div>
        </div>
      )}
    </>
  );
};
