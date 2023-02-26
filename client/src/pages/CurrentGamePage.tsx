// import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
// import { MeaningColorGame } from '../components/Games/meaningColor';
import { allGames } from '../game-content/allGames';
// import { useTypeSelector } from '../hooks/useTypeSelector';
// import { gameList } from '../game-content/gameList';
import { IGameProps, QParam } from '../types/interfaces';

export const CurrentGamePage = () => {
  let GameNow: ({ gameId, gameName }: IGameProps) => JSX.Element = ({
    gameId,
    gameName,
  }) => {
    return (
      <>
        {gameId} {gameName}
      </>
    );
  };
  // const userResults = useTypeSelector((state) => state.resultsInfo);
  let gameIndex = 0;
  let nameGame = '';
  let gameImg = '';
  const { CurrentGame } = useParams<QParam>();
  for (let i = 0; i < allGames.length; i++) {
    if (allGames[i].path === CurrentGame) {
      GameNow = allGames[i].game;
      gameIndex = i + 1;
      nameGame = allGames[i].path;
      if (allGames[i].src) {
        gameImg = allGames[i].src as string;
      }
      break;
    }
  }

  return (
    <>
      {/* <div>
        <p>{`user results from reducer:`}</p>
        {userResults &&
          userResults.map((res) => {
            return <p>{`${res.results}, ${res.gameId}, ${res.gameName}`}</p>;
          })}
      </div> */}
      <div className="game-wrap ml-[10%] mr-[10%] flex h-screen flex-col  ">
        <Link
          to="/games"
          className="upper-case mb-5 w-fit rounded bg-blue-300 p-4 text-white"
        >
          <FormattedMessage id="all_games" />
        </Link>
        <div className="game mb-8  h-full border-8 border-sky-800 bg-[url('./assets/backgroud.jpeg')] p-[3%]">
          {GameNow && (
            <GameNow gameId={gameIndex} gameName={nameGame} src={gameImg} />
          )}
        </div>
      </div>
    </>
  );
};
