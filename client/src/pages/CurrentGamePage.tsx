import { FormattedMessage } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import { allGames } from '../game-content/allGames';
import { IGameProps, QParam } from '../types/interfaces';

export const CurrentGamePage = () => {
  let GameNow: ({
    gameId,
    gameName,
    srcEn,
    srcRus,
  }: IGameProps) => JSX.Element = ({ gameId, gameName }) => {
    return (
      <>
        {gameId} {gameName}
      </>
    );
  };

  let gameIndex = 0;
  let nameGame = '';
  let gameImgRus = '';
  let gameImgEn = '';

  const { CurrentGame } = useParams<QParam>();

  for (let i = 0; i < allGames.length; i++) {
    if (allGames[i].path === CurrentGame) {
      GameNow = allGames[i].game;
      gameIndex = i + 1;
      nameGame = allGames[i].path;
      if (allGames[i].srcRus || allGames[i].srcEn) {
        gameImgRus = allGames[i].srcRus as string;
        gameImgEn = allGames[i].srcEn as string;
      }
      break;
    }
  }

  return (
    <>
      <div className="game-wrap ml-[10%] mr-[10%] flex h-screen flex-col  ">
        <Link
          to="/games"
          className="upper-case mb-5 w-fit rounded bg-blue-300 p-4 text-white"
        >
          <FormattedMessage id="all_games" />
        </Link>
        <div className="game mb-8  h-full border-8 border-sky-800 bg-[url('./assets/backgroud.jpeg')] p-[3%]">
          {GameNow && (
            <GameNow
              gameId={gameIndex}
              gameName={nameGame}
              srcRus={gameImgRus}
              srcEn={gameImgEn}
            />
          )}
        </div>
      </div>
    </>
  );
};
