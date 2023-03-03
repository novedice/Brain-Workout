import { useEffect, useState } from 'react';
import { CARD_IMAGES } from './constants';
import SingleCard from './SingleCard';
import { ICards } from './types';
import './MemoryGame.css';
import { FormattedMessage } from 'react-intl';
import { IGameProps } from '../../types/interfaces';
import { FinishGameTable } from '../Games/gamesComponents/FinishGameTable';
import { StatusGameType } from '../../types/types';
import { PrestartWindow } from '../Games/gamesComponents/PrestartWindow';

const shuffleCards = () => {
  return [...CARD_IMAGES, ...CARD_IMAGES]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }));
};

export function MemoryGame({ gameId, srcEn, srcRus }: IGameProps) {
  const [cards, setCards] = useState<ICards[]>(shuffleCards());
  const [turns, setTurns] = useState<number>(0);
  const [selectOne, setSelectOne] = useState<ICards | null>(null);
  const [selectTwo, setSelectTwo] = useState<ICards | null>(null);
  const [disabledCard, setDisabledCard] = useState(false);
  const [statusGame, setStatusGame] = useState<StatusGameType>('Wait');

  let solvedArray = cards
    .map((elem) => elem.matched)
    .filter((elem) => elem === false);

  const [bestScore, setBestScore] = useState<number>(
    parseInt(localStorage.getItem('bestScore') || '0') ||
      Number.MAX_SAFE_INTEGER
  );
  const gameFinish = () => {
    const newBestScore = turns > bestScore ? bestScore : turns;
    if (newBestScore === 0) {
      setBestScore(turns);
      localStorage.setItem('bestScore', '' + turns);
    } else {
      setBestScore(newBestScore);
      localStorage.setItem('bestScore', '' + newBestScore);
    }
    setTimeout(() => {
      setStatusGame('Finished');
    }, 2000);
  };

  const checkCompletion = () => {
    if (solvedArray.length === 0) {
      gameFinish();
    }
  };

  useEffect(() => checkCompletion(), [cards]);
  const resetGame = () => {
    setStatusGame('Started');
    setSelectOne(null);
    setSelectTwo(null);
    setCards(shuffleCards());
    setTurns(0);
  };

  const handleSelect = (card: ICards) => {
    if (card.id === selectOne?.id) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    selectOne ? setSelectTwo(card) : setSelectOne(card);
  };

  const resetTurn = () => {
    setSelectOne(null);
    setSelectTwo(null);
    setTurns((prev) => prev + 1);
    setDisabledCard(false);
  };

  useEffect(() => {
    if (selectOne && selectTwo) {
      setDisabledCard(true);
      if (selectOne.src === selectTwo.src) {
        setCards((prewCards) => {
          return prewCards.map((card) => {
            if (card.src === selectOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [selectOne, selectTwo]);

  return (
    <>
      {statusGame === 'Finished' && (
        <FinishGameTable
          score={turns}
          rightAnswers={0}
          totalAnswers={0}
          speed={0}
          startGame={resetGame}
          statusGame={statusGame}
          setStatusGame={setStatusGame}
          gameName="memory_game"
          gameID={gameId}
        />
      )}
      {statusGame === 'Wait' && (
        <PrestartWindow
          startGame={resetGame}
          setStatusGame={setStatusGame}
          gameName={'memory_game'}
          statusGame={statusGame}
          gameDescription="memory_game_description"
          gameImgRus={srcRus}
          gameImgEn={srcEn}
        />
      )}
      {statusGame !== 'Finished' && statusGame !== 'Wait' && (
        <div className="game-wrapper flex flex-col items-center">
          <h1>
            <FormattedMessage id="memory_game" />
          </h1>
          <button
            className="mt-2 w-28 rounded-full border p-1 hover:bg-red-200"
            onClick={resetGame}
          >
            <FormattedMessage id="new_game" />
          </button>
          <div className="grid-cards mb-4">
            {cards.map((card) => (
              <SingleCard
                card={card}
                key={card.id}
                handleSelect={handleSelect}
                flip={card === selectOne || card === selectTwo || card.matched}
                disabled={disabledCard}
              />
            ))}
          </div>
          <p>
            <FormattedMessage id="moves" values={{ n: turns }} />
          </p>
          <p>
            <FormattedMessage id="best_score" values={{ s: bestScore }} />
          </p>
        </div>
      )}
    </>
  );
}
