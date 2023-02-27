import '../assets/logo-brain.png';
import './mainPage.css';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { FormattedMessage } from 'react-intl';
import { UserCalendar } from '../components/UserCalendar';
import { getUserResults } from '../api/result-requerests';
import { useEffect, useState } from 'react';
import {
  SHOW_MODAL,
  UPDATE_ALL_RESULTS,
  UPDATE_CATEGORIES,
} from '../constants';
import { useAppDispatch, useTypeSelector } from '../hooks/useTypeSelector';
import { findActiveDays } from '../functions/findActiveDays';
import { Link } from 'react-router-dom';
import { getCategory } from '../api/category-requests';
// import { ICategory } from '../types/interfaces';
import { allGames } from '../game-content/allGames';
import { getRandom } from '../functions/random';

export function MainPage() {
  const { loggedIn } = useTypeSelector((state) => state.loggedInInfo);
  const [activeDays, setActiveDays] = useState<string[]>();
  const dispatch = useAppDispatch();
  const [gamePath, setGamePath] = useState('');

  const reciveResults = async () => {
    const response = await getUserResults();
    if (response) {
      dispatch({ payload: response, type: UPDATE_ALL_RESULTS });
      // setOrderedRes(resultsForStatistic(response));
      setActiveDays(findActiveDays(response));
    }
  };

  const reciveFavorites = async () => {
    const responseFavorites = await getCategory();
    if (responseFavorites?.length) {
      console.log('resp fav', responseFavorites);
      console.log('length', responseFavorites.length);
      dispatch({ payload: responseFavorites, type: UPDATE_CATEGORIES });

      setGamePath(() => {
        const filteredGames = allGames.filter(
          (game) =>
            responseFavorites[getRandom(0, responseFavorites.length - 1)]
              .category === game.category
        );

        return filteredGames[getRandom(0, filteredGames.length - 1)].path;
      });
    } else {
      setGamePath(allGames[getRandom(0, allGames.length - 1)].path);
    }
  };

  const modalShow = () => {
    dispatch({ type: SHOW_MODAL });
  };

  useEffect(() => {
    reciveResults();
    reciveFavorites();
  }, []);

  return (
    <>
      <main className="main">
        <div className="main-container">
          <div className="workout-container">
            <div className="today-workout ml-auto mr-auto flex w-[100%] justify-center bg-blue-500">
              <FormattedMessage id="today" />
            </div>
            <div className="workout width-[100%] flex flex-row justify-around">
              <div className="workout-image w-[200px]">
                <img src="logo-brain.png"></img>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-center text-xl">
                  <FormattedMessage id="description" />
                </p>
                {loggedIn && (
                  <Link to={`/games/${gamePath}`}>
                    <button className="btn start-workout ml-auto mr-auto flex w-[150px] items-center justify-center rounded bg-blue-700">
                      <FormattedMessage id="start_random_game" />
                    </button>
                  </Link>
                )}
                {!loggedIn && (
                  <button
                    onClick={modalShow}
                    className="btn start-workout ml-auto mr-auto flex w-[150px] items-center justify-center rounded bg-blue-700"
                  >
                    <FormattedMessage id="start_random_game" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="calendar-container m-2">
            <FormattedMessage id="show_calendar" />
            <UserCalendar activeDays={activeDays} />
          </div>
        </div>
      </main>
    </>
  );
}
