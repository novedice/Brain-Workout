import React, { useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { IGameProps } from '../../../types/interfaces';
import { FinishGameTable } from '../gamesComponents/FinishGameTable';
import { ButtonNumber } from '../numberMemory/ButtonStart';
import './SequenceMemory.css';

function getRandomNumber() {
  let num = Math.trunc(Math.random() * 9);
  if (num === 9) num = 8;
  return num;
}

export default function SequenceMemory({gameId, gameName}: IGameProps) {
  const [currentSequence, setCurrentSequence] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<{num: number, id: number}>({num: 0, id: 0});
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [score, setScore] = useState(1);
  const btnRefs = [
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
  ];
  const field = useRef<HTMLDivElement>(null);

  function animateBtn(btn: HTMLButtonElement | null) {
    if (!btn) return;
    btn.classList.add('active');
    setTimeout(() => {
      btn.classList.remove('active');
    }, 350)
  }

  function animateCurrentSequence(sequence: number[]) {
    if (!field.current) return;
    field.current.classList.add('disabled');
    sequence.forEach((el, index) => {
      setTimeout(() => {
        console.log('here');
        animateBtn(btnRefs[el].current);
      }, 750 * index);
    })
    setTimeout(() => {
      if (field.current) {
        field.current.classList.remove('disabled');
      }
    }, 750 * (sequence.length - 1));
  }

  function start() {
    setIsStart(true);
    setIsEnd(false);
    setScore(1);
    setCurrentSequence((prev) => {
      const num = getRandomNumber();
      prev.push(num);
      setCurrentNumber({num, id: 0});
      setTimeout(() => {
        animateCurrentSequence(prev);
      }, 500)
      return prev;
    });
    
  }

  function nextLevel() {
    setScore(prev => prev + 1);
    setCurrentSequence((prev) => {
      const num = getRandomNumber();
      prev.push(num);
      setCurrentNumber({num: prev[0], id: 0});
      setTimeout(() => {
        animateCurrentSequence(prev);
      }, 1000)
      return prev;
    });
  }

  function stop() {
    setIsStart(false);
    setIsEnd(true);
    setCurrentNumber({num: 0, id: 0});
    setCurrentSequence([]);
  }

  function createBtnHandler(num: number) {
    return () => {
      animateBtn(btnRefs[num].current)
      if (currentNumber.num === num) {
        if (currentNumber.id === currentSequence.length - 1) {
          return nextLevel();
        } else {
          setCurrentNumber({
            num: currentSequence[currentNumber.id + 1],
            id: currentNumber.id + 1,
          });
        }
      } else {
        stop();
      }
    }
  }
  
  

  return (
    <>
      {
        !isEnd &&
        <div className='sequence-memory__warp'>
          <div className="sequence-memory__header">
              <div className="sequence-memory__title first-letter:uppercase">
                Sequence memory
              </div>
              <div className="sequence-memory__description">
                <FormattedMessage id="sequence_memory_description" />
              </div>
            </div>
            {
              isStart && !isEnd &&
                <div className="sequence-memory__container">
                  {(isStart || isEnd) && (
                    <div className="sequence-memory__score">
                      <FormattedMessage id="level" /> {score}
                    </div>
                  )}
                  <div ref={field} className="sequence-memory__field">
                    {
                      [0,1,2,3,4,5,6,7,8].map((num) => {
                        return <button key={num} ref={btnRefs[num]} onClick={createBtnHandler(num)} className='sequence-memory__field-btn'></button>
                      })
                    }
                  </div>
                </div>
            }
            {!isStart && (
              <ButtonNumber text="start" callback={start}></ButtonNumber>
            )}
            {isStart && !isEnd && (
              <ButtonNumber text="stop" callback={stop}></ButtonNumber>
            )}

        </div>
      }
      {isEnd && (
        <FinishGameTable
          score={score}
          rightAnswers={0}
          totalAnswers={0}
          speed={0}
          started={isStart}
          setStarted={setIsStart}
          startGame={start}
          gameName={gameName}
          gameID={gameId}
          finished={isEnd}
        />
      )}
    </>
  )
}
