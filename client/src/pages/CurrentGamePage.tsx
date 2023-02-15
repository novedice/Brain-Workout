// import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
// import { MeaningColorGame } from '../components/Games/meaningColor';
import { allGames } from '../game-content/allGames';
// import { gameList } from '../game-content/gameList';
import { QParam } from '../types/interfaces';

export const CurrentGamePage = () => {
  let GameNow: () => JSX.Element = () => {
    return <></>;
  };
  const { CurrentGame } = useParams<QParam>();
  for (let i = 0; i < allGames.length; i++) {
    if (allGames[i].path === CurrentGame) {
      GameNow = allGames[i].game;
      break;
    }
  }

  return (
    <>
      <div className="game-wrap ml-[10%] mr-[10%] flex h-screen flex-col  ">
        <Link to="/games" className="mb-5 w-fit rounded bg-blue-300 p-4">
          <FormattedMessage id="all_games" />
        </Link>
        <div className="game mb-8  h-full border-8 border-sky-800 bg-[url('./assets/backgroud.jpeg')] p-[3%]">
          {GameNow && <GameNow />}
        </div>
      </div>
    </>
  );
};
