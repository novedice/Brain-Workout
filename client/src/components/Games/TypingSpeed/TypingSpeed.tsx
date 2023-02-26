import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import randomWords from 'random-words';
import './TypingSpeed.css';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FinishGameTable } from '../gamesComponents/FinishGameTable';
import { IGameProps } from '../../../types/interfaces';
import { StatusGameType } from '../../../types/types';
const NUMB_WORDS = 100;
const SECONDS = 10;

export function TypingSpeed({ gameId }: IGameProps) {
  const [words, setWords] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(-1);
  const [currentChar, setCurrentChar] = useState<string>('');
  const [correct, setCorrect] = useState<number>(0);
  const [inCorrect, setInCorrect] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number | undefined>(SECONDS);
  const [statusGame, setStatusGame] = useState<StatusGameType>('Wait');
  const inputText = useRef<any>(null);

  useEffect(() => {
    if (statusGame === 'Started') {
      inputText.current.focus();
    }
  }, [statusGame]);

  function generateWords() {
    return randomWords(NUMB_WORDS);
  }

  const saveResult = () => {
    localStorage.setItem('bestTypingScore', JSON.stringify(correct));
    localStorage.setItem(
      'bestTypingAccuracyScore',
      JSON.stringify(Math.round((correct / (correct + inCorrect)) * 100))
    );
  };

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
            saveResult();
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
      <h1 className="game-name">
        <FormattedMessage id="typing_speed_test" />
      </h1>
      <h2 className="time-left">
        <FormattedMessage id="time_left_typing" />
        <span className="important-text">{timeLeft}</span>
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

      {statusGame === 'Wait' && (
        <button
          className="btn mb-4 w-28 rounded-full border p-1 text-xl hover:bg-red-200"
          onClick={startTime}
        >
          <FormattedMessage id="start" />
        </button>
      )}

      {statusGame === 'Finished' && (
        <>
          <FinishGameTable
            score={correct}
            rightAnswers={correct}
            totalAnswers={correct + inCorrect}
            speed={0}
            statusGame={statusGame}
            setStatusGame={setStatusGame}
            startGame={startTime}
            gameName={'typing_speed'}
            gameID={gameId}
            resultsName="words_per_minute"
            // finished={statusGame === 'Finished'}
          />

          {/* <div className="section result-section">
            <div className="result-container content">
              <p>
                <FormattedMessage id="words_per_minute" />{' '}
                <span className="important-text">{correct}</span>
              </p>
              <p>
                <FormattedMessage id="accuracy_simple" />:{' '}
                <span className="important-text">
                  {Math.round((correct / (correct + inCorrect)) * 100)}%
                </span>
              </p>
            </div>
            <div>
              <button
                className="btn mr-4 rounded-full border p-1 px-4 text-xl hover:bg-red-200"
                onClick={() => saveResult()}
              >
                <FormattedMessage id="save_result" />
              </button>
              <button
                className="btn rounded-full border p-1 px-4 text-xl hover:bg-red-200"
                onClick={startTime}
              >
                <FormattedMessage id="new_test" />
              </button>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
}
