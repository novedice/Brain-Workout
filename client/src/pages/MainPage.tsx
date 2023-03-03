import '../assets/logo-brain.png';
import './mainPage.css';
import '../assets/brush1.png';
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
      setActiveDays(findActiveDays(response));
    }
  };

  const reciveFavorites = async () => {
    const responseFavorites = await getCategory();

    if (responseFavorites?.length) {
      dispatch({ payload: responseFavorites, type: UPDATE_CATEGORIES });

      setGamePath(() => {
        const filteredGames = allGames.filter(
          (game, index) =>
            responseFavorites[getRandom(0, responseFavorites.length - 1)]
              .category === game.category && index < 7
        );

        return filteredGames[getRandom(0, filteredGames.length - 1)].path;
      });
    } else {
      setGamePath(allGames[getRandom(0, 6)].path);
    }
  };

  const modalShow = () => {
    dispatch({ type: SHOW_MODAL });
  };

  useEffect(() => {
    reciveResults();
    reciveFavorites();
  }, [localStorage]);

  return (
    <>
      {' '}
      <main className="main">
        <div
          className="main-description"
          style={{
            backgroundImage: `url("brush1.png") `,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <h2>
            <FormattedMessage id="discover" />
          </h2>

          <h3>
            <FormattedMessage id="programs" />
          </h3>
        </div>
        <div className="main-container">
          <div className="workout-container">
            <div className="today-workout ml-auto mr-auto flex justify-center">
              <FormattedMessage id="today" />
            </div>
            <div className="workout-image w-1/2">
              <img src="logo-brain.png"></img>
            </div>
            <div className="workout width-[100%] flex flex-row justify-around">
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
          <div className="calendar-container">
            <h2 className="calendar-text">
              <FormattedMessage id="show_calendar" />
            </h2>
            <UserCalendar activeDays={activeDays} />
          </div>
        </div>
      </main>
    </>
  );
}
