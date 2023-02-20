/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import randomWords from 'random-words';
import './TypingSpeed.css';
import React from 'react';
const NUMB_WORDS = 100;
const SECONDS = 60;

export function TypingSpeed() {
  const [words, setWords] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(-1);
  const [currentChar, setCurrentChar] = useState<string>('');
  const [correct, setCorrect] = useState<number>(0);
  const [inCorrect, setInCorrect] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number | undefined>(SECONDS);
  const [statusGame, setStatusGame] = useState('wait');
  const inputText = useRef<any>(null);

  useEffect(() => {
    if (statusGame === 'Started') {
      inputText.current.focus();
    }
  }, [statusGame]);

  function generateWords() {
    // return new Array(NUMB_WORDS).fill(null).map(() => randomWords(NUMB_WORDS));
    return randomWords(NUMB_WORDS);
  }

  const startTime = () => {
    if (statusGame === 'Finished') {
      setWords(generateWords());
      setCurrentIndex(0);
      setCorrect(0);
      setInCorrect(0);
    }
    if (statusGame !== 'Started') {
      setStatusGame('Started');
      let interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            clearInterval(interval);
            setStatusGame('Finished');
            setCurrentInput('');
            return SECONDS;
          } else {
            return prev! - 1;
          }
        });
      }, 1000);
    }
  };

  const checkMatch = () => {
    const compareWord = words[currentIndex];
    const doesItMatch = compareWord === currentInput.trim();
    if (doesItMatch) {
      setCorrect(correct + 1);
    } else {
      setInCorrect(inCorrect + 1);
    }
  };

  const hendleKeyPress = ({ keyCode, key }: KeyboardEvent) => {
    // space
    if (keyCode == 32) {
      checkMatch();
      setCurrentInput('');
      setCurrentIndex(currentIndex + 1);
      setCurrentCharIndex(-1);
      //backspace
    } else if (keyCode === 8) {
      setCurrentCharIndex(currentCharIndex - 1);
      setCurrentChar('');
    } else {
      setCurrentCharIndex(currentCharIndex + 1);
      setCurrentChar(key);
    }
  };

  useEffect(() => {
    setWords(generateWords());
  }, []);

  function getBackgroundClass(index: number, id: number, symbol: string) {
    if (
      index === currentIndex &&
      id === currentCharIndex &&
      currentChar &&
      statusGame !== 'Finished'
    ) {
      if (symbol === currentChar) {
        return 'background-sucsess';
      } else {
        return 'background-failed';
      }
    } else if (
      index === currentIndex &&
      currentCharIndex >= words[currentIndex].length
    ) {
      return 'background-failed';
    } else {
      return '';
    }
  }

  return (
    <div className="container-game">
      <h1 className="game-name">Typing Speed Test</h1>
      <h2 className="time-left">
        Time left: <span className="seconds-left">{timeLeft}</span>
      </h2>

      {statusGame === 'Started' && (
        <div className="section">
          <div className="text">
            <div className="text-content">
              <div className="content">
                {words.map((word, index) => (
                  <React.Fragment key={index}>
                    <span>
                      {word.split('').map((symbol, id) => (
                        <span
                          className={getBackgroundClass(index, id, symbol)}
                          key={id}
                        >
                          {symbol}
                        </span>
                      ))}
                    </span>
                    <span> </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="section">
        <input
          ref={inputText}
          disabled={statusGame !== 'Started'}
          className="input-section"
          onKeyDown={hendleKeyPress}
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
        ></input>
      </div>
      <button
        className="mb-4 w-28 rounded-full border p-1 hover:bg-red-200"
        onClick={startTime}
      >
        Start
      </button>
      {statusGame === 'Finished' && (
        <div className="section">
          <p>
            Words per minute: <span>{correct}</span>
          </p>
          <p>
            Accuracy:{' '}
            <span>{Math.round(correct / (inCorrect + correct)) * 100}%</span>
          </p>
        </div>
      )}
    </div>
  );
}
