import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getBestResult } from '../../../api/result-requerests';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { IGameProps } from '../../../types/interfaces';
import { FinishGameTable } from '../gamesComponents/FinishGameTable';
import { ButtonNumber } from './ButtonStart';
import './NumberMemory.css';

const generateNumber = (length: number) => {
  let number = '';
  for (let i = 0; i < length; i += 1) {
    number += String(Math.trunc(Math.random() * 9));
  }
  return String(number);
};

export default function NumberMemory({ gameId }: IGameProps) {
  // const gameInfo = allGames.find((el) => el.id === id);
  // const gamePath = 'number-memory';
  const { lang } = useTypeSelector((state) => state.userInfo);
  const { loggedIn } = useTypeSelector((state) => state.loggedInInfo);
  const [currentLength, setCurrentLength] = useState(1);
  const [currentNumber, setCurrentNumber] = useState('');
  const [isStart, setIsStart] = useState(false);
  const [time, setTime] = useState(0);
  const [isRemember, setIsRemember] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [score, setScore] = useState(1);
  const [userNumber, setUserNumber] = useState('');
  const [bestResult, setBestResult] = useState<number>();
  // const [isSaved, setIsSaved] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const start = () => {
    setScore(1);
    setIsStart(true);
    setCurrentLength(1);
    setCurrentNumber(generateNumber(currentLength));
    setTime(5);
    setIsRemember(true);
    setIsEnd(false);
    // setIsSaved(false);
    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000)
    );
  };

  const stop = () => {
    setIsStart(false);
    setIsEnd(true);
    setIsRemember(false);
    if (timer) {
      clearTimeout(timer);
      setTimer(undefined);
    }
  };

  const nextNumber = () => {
    setCurrentLength((prev) => prev + 1);
    setCurrentNumber(generateNumber(currentLength + 1));
    setTime(10);
    setIsRemember(true);
    setUserNumber('');
  };

  const submitHandler = () => {
    if (userNumber === currentNumber) {
      setScore((prev) => prev + 1);
      nextNumber();
    } else {
      setIsEnd(true);
      setIsStart(false);
    }
  };

  const onNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNumber(e.target.value);
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitHandler();
    }
  };

  useEffect(() => {
    if (loggedIn) {
      getBestResult(5, 'DESC')
        .then((res) => {
          if (res) {
            setBestResult(res.value);
          }
        })
        .catch(() => {
          const result = localStorage.getItem('number_memory');
          if (result) {
            setBestResult(Number(result));
          }
        });
    }

    const result = localStorage.getItem('number_memory');
    if (result) {
      setBestResult(Number(result));
    }
  }, []);

  useEffect(() => {
    if (time > 0 && isRemember) {
      if (timer) clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          setTime((prev) => prev - 1);
        }, 1000)
      );
    }
    if (time === 0 && isRemember) {
      setIsRemember(false);
      clearTimeout(timer);
      setTimer(undefined);
    }
  }, [time]);

  return (
    <>
      {!isEnd && (
        <div className="number-game__wrap">
          <div>
            <div className="number-game__header">
              <div className="number-game__title first-letter:uppercase">
                <FormattedMessage id="number_memory" />
              </div>
              <div className="number-game__description">
                <FormattedMessage id="remember_number" />
              </div>
              {bestResult !== undefined && bestResult !== 0 && (
                <div className="number-game__best-result">
                  <FormattedMessage
                    id="your_best_result"
                    values={{ n: bestResult }}
                  />
                </div>
              )}
            </div>
            <div className="number-game__container">
              <div className="number-game__container-inner">
                {(isStart || isEnd) && (
                  <div className="number-game__score">
                    <FormattedMessage id="level" /> {score}
                  </div>
                )}
                {isStart && !isEnd && (
                  <>
                    <div className="number-game__inner">
                      {isRemember && (
                        <div className="number-game__remember">
                          <div className="number-game__number">
                            {currentNumber}
                          </div>
                          <div className="number-game__timer">{time}</div>
                        </div>
                      )}
                      {!isRemember && (
                        <div className="number-game__input">
                          <input
                            value={userNumber}
                            onChange={onNumberInputChange}
                            type="text"
                            onKeyUp={onEnterPress}
                            placeholder={lang === 'en' ? 'Number' : 'Число'}
                          ></input>
                          <button onClick={submitHandler}>
                            <FormattedMessage id="submit" />
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
                {/* {isEnd && (
            <div className="number-game__end">
              <div className="number-game__message">
                {lang === 'rus' ? 'Игра окончена!' : 'Game over!'}
              </div>
            </div>
          )} */}
              </div>
            </div>
          </div>

          {/* {isEnd && <ButtonNumber text="save" callback={saveResult}></ButtonNumber>} */}
          {!isStart && (
            <ButtonNumber text="start" callback={start}></ButtonNumber>
          )}
          {isStart && !isEnd && (
            <ButtonNumber text="stop" callback={stop}></ButtonNumber>
          )}
        </div>
      )}
      {isEnd && (
        <FinishGameTable
          score={score}
          rightAnswers={0}
          totalAnswers={0}
          speed={0}
          started={isStart}
          setStarted={setIsStart}
          startGame={start}
          gameName={'number_memory'}
          gameID={gameId}
          finished={isEnd}
        />
      )}
    </>
  );
}
