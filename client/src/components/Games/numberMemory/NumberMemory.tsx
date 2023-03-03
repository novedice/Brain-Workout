import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getBestResult } from '../../../api/result-requerests';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { IGameProps } from '../../../types/interfaces';
import { StatusGameType } from '../../../types/types';
import { FinishGameTable } from '../gamesComponents/FinishGameTable';
import { PrestartWindow } from '../gamesComponents/PrestartWindow';
import { ButtonNumber } from './ButtonStart';
import './NumberMemory.css';

const generateNumber = (length: number) => {
  let number = '';
  for (let i = 0; i < length; i += 1) {
    number += String(Math.trunc(Math.random() * 9));
  }
  return String(number);
};

export default function NumberMemory({ gameId, srcEn, srcRus }: IGameProps) {
  const { lang } = useTypeSelector((state) => state.userInfo);
  const { loggedIn } = useTypeSelector((state) => state.loggedInInfo);
  const [currentLength, setCurrentLength] = useState(1);
  const [currentNumber, setCurrentNumber] = useState('');
  const [time, setTime] = useState(0);
  const [isRemember, setIsRemember] = useState(false);
  const [statusGame, setStatusGame] = useState<StatusGameType>('Wait');
  const [score, setScore] = useState(1);
  const [userNumber, setUserNumber] = useState('');
  const [bestResult, setBestResult] = useState<number>();
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const start = () => {
    setScore(1);
    setStatusGame('Started');
    setCurrentLength(1);
    setCurrentNumber(generateNumber(currentLength));
    setTime(5);
    setIsRemember(true);
    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000)
    );
  };

  const stop = () => {
    setStatusGame('Finished');
    setIsRemember(false);
    setCurrentLength(1);
    if (timer) {
      clearTimeout(timer);
      setTimer(undefined);
    }
  };

  const nextNumber = () => {
    setCurrentLength((prev) => prev + 1);
    setCurrentNumber(generateNumber(currentLength + 1));
    setTime(5);
    setIsRemember(true);
    setUserNumber('');
  };

  const submitHandler = () => {
    if (userNumber === currentNumber) {
      setScore((prev) => prev + 1);
      nextNumber();
    } else {
      setStatusGame('Finished');
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
      {statusGame !== 'Finished' && statusGame !== 'Wait' && (
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
                {statusGame === 'Started' && (
                  <div className="number-game__score">
                    <FormattedMessage id="level" /> {score}
                  </div>
                )}
                {statusGame === 'Started' && (
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
              </div>
            </div>
          </div>

          {statusGame !== 'Started' && (
            <ButtonNumber text="start" callback={start}></ButtonNumber>
          )}
          {statusGame === 'Started' && (
            <ButtonNumber text="stop" callback={stop}></ButtonNumber>
          )}
        </div>
      )}
      {statusGame === 'Wait' && (
        <PrestartWindow
          startGame={start}
          setStatusGame={setStatusGame}
          gameName={'number_memory'}
          statusGame={statusGame}
          gameDescription="number_memory_description"
          gameImgRus={srcRus}
          gameImgEn={srcEn}
        />
      )}
      {statusGame === 'Finished' && (
        <FinishGameTable
          score={score}
          rightAnswers={0}
          totalAnswers={0}
          speed={0}
          statusGame={statusGame}
          setStatusGame={setStatusGame}
          startGame={start}
          gameName={'number_memory'}
          gameID={gameId}
        />
      )}
    </>
  );
}
