// import { useState } from 'react';
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
  // const [GameNow, setGameNow] = useState<() => JSX.Element>(MeaningColorGame);
  for (let i = 0; i < allGames.length; i++) {
    if (allGames[i].path === CurrentGame) {
      GameNow = allGames[i].game;
      console.log('gamelis i ', allGames[i].path);
      break;
    }
  }

  return (
    <>
      <div className="game-wrap ml-[10%] mr-[10%] flex h-screen flex-col  ">
        <Link to="/games" className="mb-5 w-fit rounded bg-blue-300 p-4">
          ALL GAMES
        </Link>
        <div className="game h-2/4 border-8 border-sky-800 p-[3%]">
          {GameNow && <GameNow />}
        </div>
      </div>
    </>
  );
};
