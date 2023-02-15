import { cards } from './cards';
import './speedMatch.css';
import { SpeedMatchCard } from './renderCard';
import '../../../assets/speed-match-game/card-cover.jpeg';
import { ICardSpeedMacth } from '../../../types/interfaces';
import { useState } from 'react';
import { getRandom } from '../../../functions/random';
import { Timer } from '../../Timer';
import { ButtonStart } from '../gamesComponents/ButtonStart';
import '../../../assets/speed-match-game/pause.jpeg';
import '../../../assets/speed-match-game/play.png';

export const SpeedMatchGame = () => {
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
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [multiple, setMultiple] = useState(1);
  const [backActive, setBackActive] = useState<'' | 'changing-back'>('');
  const [speed, setSpeed] = useState(0);
  const [beginAnswer, setBeginAnswer] = useState(new Date());

  const startGame = () => {
    setScore(0);
    setSeconds(20);
    setFinished(false);
    setStarted(true);
    setSeconds(20);
    setSpeed(0);
    setBeginAnswer(new Date());
  };

  // const finishGame = () => {};

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

  const yesAnswer = () => {
    if (prevCard === currentCard) {
      setScore(score + 50 * multiple);
      setRightAnswers(rightAnswers + 1);
      setMultiple(multiple === 10 ? 10 : multiple + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
      setMultiple(1);
    }
    // const dif = ((new Date()) - beginAnswer);
    setSpeed(speed + (+new Date() - +beginAnswer));
    changeCards();
    setBeginAnswer(new Date());
  };

  const noAnswer = () => {
    if (prevCard !== currentCard) {
      setScore(score + 50 * multiple);
      setRightAnswers(rightAnswers + 1);
      setMultiple(multiple === 10 ? 10 : multiple + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
      setMultiple(1);
    }
    setSpeed(speed + (+new Date() - +beginAnswer));

    changeCards();
    setBeginAnswer(new Date());
  };

  return (
    <>
      {finished && (
        <>
          <div className="flex h-full w-full flex-col items-center justify-center bg-gray-300">
            <p>SPEED MATCH</p>
            <p>{`Score: ${score}`}</p>
            <p>{`Correct: ${rightAnswers} of ${
              rightAnswers + wrongAnswers
            }`}</p>
            <p>{`Accuracy: ${(
              (rightAnswers * 100) /
              (rightAnswers + wrongAnswers)
            ).toFixed(0)}%`}</p>
            <p>{`Your average speed is ${(
              speed /
              (rightAnswers + wrongAnswers)
            ).toFixed(0)} ms`}</p>
            <ButtonStart
              startGame={startGame}
              setStarted={setStarted}
              started={started}
            />
          </div>
        </>
      )}
      {!finished && (
        <div className="flex w-full flex-col">
          <div className="mb-[5%] flex w-full items-center justify-around">
            <ButtonStart
              startGame={startGame}
              setStarted={setStarted}
              started={started}
            />
            <button
              className="mr-3 flex h-[50px] w-[150px] items-center justify-around self-center rounded-lg border-8  border-blue-300 align-middle"
              onClick={() => setPaused(!paused)}
            >
              {paused ? 'PLAY' : 'PAUSE'}
              <img
                className="h-[34px] w-[34px] bg-blue-300"
                src={paused ? 'pause.jpeg' : 'play.png'}
              ></img>
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
            <p className="border-blue flex h-[50px] w-[50px] items-center justify-center rounded-full border-4 border-blue-300">{`x${multiple}`}</p>
          </div>
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
            <button
              className="mr-3 h-[50px] w-[80px] rounded-lg border bg-blue-400"
              onClick={noAnswer}
              disabled={!started}
            >
              NO
            </button>
            <button
              className="h-[50px] w-[80px] rounded-lg border bg-blue-400"
              onClick={yesAnswer}
              disabled={!started}
            >
              YES
            </button>
          </div>
        </div>
      )}
    </>
  );
};
