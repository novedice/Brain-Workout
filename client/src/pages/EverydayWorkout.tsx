import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCategory } from '../api/category-requests';
import { BlockNotLoggedIn } from '../components/BlockNotLoggedIn';
import { getRandom } from '../functions/random';
import { allGames } from '../game-content/allGames';
import { useTypeSelector } from '../hooks/useTypeSelector';
import {
  ICategory,
  IGameList,
  IGameProps,
  QparamWorkout,
} from '../types/interfaces';
import { WorkoutStageType } from '../types/types';
import './workout.css';

export const EverydayWorkout = () => {
  const { loggedIn } = useTypeSelector((state) => state.loggedInInfo);
  const favoriteCategories = useTypeSelector(
    (state) => state.favoriteCategoriesInfo
  );
  const [choosenCategories, setChoosenCategories] = useState<ICategory[]>([]);
  const [workoutStage, setWorkoutStage] = useState<WorkoutStageType>('Wait');
  //  const [secondGameStage, setSecondGameStage] = useState<StatusGameType>('Wait');
  const [todayGames, setTodayGames] = useState<IGameList[]>([]);
  const newGames: IGameList[] = [];

  const { gameNumber } = useParams<QparamWorkout>();

  // const { token } = useTypeSelector((state) => state.tokenInfo);
  let CurrentWorkoutGame: ({
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

  // let gameIndex = 0;
  // let nameGame = '';
  // let gameImgRus = '';
  // let gameImgEn = '';

  const recieveCategories = async () => {
    const responseCategories = await getCategory();
    if (responseCategories?.length) {
      setChoosenCategories(responseCategories);
      console.log('response categ:', responseCategories);
      console.log('choosenCat:', choosenCategories);
      if (responseCategories.length) {
        for (let category of responseCategories) {
          console.log('category:', category);
          const gamesCategory = allGames.filter(
            (game) => game.category === category.category
          );
          console.log('games category', gamesCategory);
          newGames.push(gamesCategory[getRandom(0, gamesCategory.length)]);
          console.log('new games:', newGames);
        }
      }
    }
    while (newGames.length < 2) {
      const gamesNotInToday = newGames.length
        ? allGames.filter((game) => game.category !== newGames[0].category)
        : allGames;
      newGames.push(gamesNotInToday[getRandom(0, gamesNotInToday.length)]);
      console.log('new games in while:', newGames);
      setTodayGames(newGames);
      console.log('todays games', todayGames);
    }
  };

  const startCurrentGame = () => {
    console.log('final games', todayGames);
    console.log('query param', gameNumber);
    CurrentWorkoutGame = todayGames[Number(gameNumber) - 1].game;
  };

  useEffect(() => {
    recieveCategories();
  }, [favoriteCategories]);

  useEffect(() => {
    startCurrentGame();
  }, [todayGames, workoutStage]);

  return (
    <>
      {!loggedIn && <BlockNotLoggedIn />}
      {loggedIn && (
        <div className="workout-page-container">
          <div className="workout-page">
            <aside className="aside-workout">Todays workout</aside>
            <main>
              <div>
                {todayGames.map((game) => (
                  <div key={game.id}>
                    <p>{game.category}</p>
                    <p>{game.path}</p>
                  </div>
                ))}
              </div>
              <div>
                <CurrentWorkoutGame
                  gameId={todayGames[Number(gameNumber) - 1].id}
                  gameName={todayGames[Number(gameNumber) - 1].path}
                />
              </div>
              <Link to="/workout/2">
                <button onClick={() => setWorkoutStage('FirstFinished')}>
                  press for second
                </button>
              </Link>
              {/* <div>{workoutStage}</div> */}
              {/* {firstGameStage === 'Started' && <WorkoutGames[0] />} */}
              {/* <WorkoutGames /> */}
            </main>
          </div>
        </div>
      )}
    </>
  );
};
