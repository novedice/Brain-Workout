import React, { useEffect, useState } from 'react'
import { createResult, getBestResult } from '../../../api/result-requerests';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { ButtonNumber } from './ButtonStart';
import './NumberMemory.css';

const generateNumber = (length: number) => {
  let number = '';
  for (let i = 0; i < length; i += 1) {
    number += String(Math.trunc(Math.random() * 9));
  }
  return String(number);
}

const gameId = 5;

export default function NumberMemory() {
  const {language} = useTypeSelector(state => state.userInfo)
  const {loggedIn} = useTypeSelector(state => state.loggedInInfo);
  const [currentLength, setCurrentLength] = useState(1);
  const [currentNumber, setCurrentNumber] = useState('');
  const [isStart, setIsStart] = useState(false);
  const [time, setTime] = useState(0);
  const [isRemember, setIsRemember] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [score, setScore] = useState(1);
  const [userNumber, setUserNumber] = useState('');
  const [bestResult, setBestResult] = useState<number>();
  const [isSaved, setIsSaved] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const start = () => {
    setScore(1);
    setIsStart(true);
    setCurrentLength(1);
    setCurrentNumber(generateNumber(currentLength));
    setTime(10);
    setIsRemember(true);
    setIsEnd(false);
    setIsSaved(false);
    if (timer) clearTimeout(timer);
    setTimer(setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000));
  }

  const stop = () => {
    setIsStart(false);
    setIsEnd(true);
    setIsRemember(false);
    if (timer) {
      clearTimeout(timer);
      setTimer(undefined);
    }
  }

  const nextNumber = () => {
    setCurrentLength((prev) => prev + 1);
    setCurrentNumber(generateNumber(currentLength + 1));
    setTime(10);
    setIsRemember(true);
    setUserNumber('');
  }

  const submitHandler = () => {
    if (userNumber === currentNumber) {
      setScore((prev) => prev + 1)
      nextNumber();
    } else {
      setIsEnd(true);
      setIsStart(false);
    }
  }

  const saveResult = () => {
    if (!isSaved) {
      if (loggedIn) {
        createResult({gameId, value: score})
      }
      localStorage.setItem('number-memory', String(score));
      setIsSaved(true);
    }
  }

  const onNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNumber(e.target.value);
  }
  
  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitHandler();
    }
  }

  useEffect(() => {
    if (loggedIn) {
      getBestResult(5, 'DESC')
      .then((res) => {
        if (res) {
          setBestResult(res.result);
        }
      });
    }
    const result = localStorage.getItem('number-memory');
    if (result) {
      setBestResult(Number(result));
    }
  }, [])  

  useEffect(() => {
    if (time > 0 && isRemember) {
      if (timer) clearTimeout(timer);
      setTimer(setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000));
    }
    if (time === 0 && isRemember) {
      setIsRemember(false);
      clearTimeout(timer);
      setTimer(undefined);
    }
  }, [time]);

  return (
    <div className='number-game__wrap'>
      <div className="number-game__header">
        <div className="number-game__title">Number Memory</div>
        <div className="number-game__description">{
          language === 'rus' ?
          'Запомните число и после введите его.' : 
          'Remember the number and then enter it.'
        }</div>
        {
         bestResult !== undefined && bestResult !== 0 && 
          <div className="number-game__best-result">
            {
              language === 'rus' ?
              `Ваш лучший результат: Уровень ${bestResult}` :
              `Your best result: Level ${bestResult}`
            }
          </div>
        }
      </div>
      <div className="number-game__container">
        <div className="number-game__container-inner">
          {
            (isStart || isEnd) && 
            <div className="number-game__score">{language === 'rus' ? 'Уровень' : 'Level'} {score}</div>
          }
          {
            isStart && !isEnd &&
            <>
              <div className="number-game__inner">
                {
                  isRemember &&
                  <div className="number-game__remember">
                    <div className="number-game__number">
                      {currentNumber}
                    </div>
                    <div className="number-game__timer">
                      {time}
                    </div>
                  </div>
                }
                {
                  !isRemember && 
                  <div className="number-game__input">
                    <input 
                    value={userNumber}
                    onChange={onNumberInputChange}
                    type='text'
                    onKeyUp={onEnterPress}
                    placeholder={language === 'rus' ? 'Число' : 'Number'}
                    ></input>
                    <button onClick={submitHandler}>{language === 'rus' ? 'Ввод' : 'Submit'}</button>
                  </div>
                }
              </div>
            </>
          }
          {
            isEnd && 
            <div className="number-game__end">
              <div className="number-game__message">
                {
                  language === 'rus' ?
                  'Игра окончена!' :
                  "Game over!"
                }
              </div>
            </div>
          }
        </div>
      </div>
      {isEnd && <ButtonNumber text='save' callback={saveResult}></ButtonNumber>}
      {!isStart && <ButtonNumber text='start' callback={start}></ButtonNumber>}
      {isStart && !isEnd && <ButtonNumber text='stop' callback={stop}></ButtonNumber>}
    </div>
  )
}