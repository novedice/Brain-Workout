import '../assets/logo-brain.png';
import './mainPage.css';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { FormattedMessage } from 'react-intl';
import { UserCalendar } from '../components/UserCalendar';
import { getUserResults } from '../api/result-requerests';
import { useEffect, useState } from 'react';
import { UPDATE_ALL_RESULTS } from '../constants';
import { useAppDispatch } from '../hooks/useTypeSelector';
import { findActiveDays } from '../functions/findActiveDays';

export function MainPage() {
  const [activeDays, setActiveDays] = useState<string[]>();
  const dispatch = useAppDispatch();

  const reciveResults = async () => {
    const response = await getUserResults();
    if (response) {
      dispatch({ payload: response, type: UPDATE_ALL_RESULTS });
      // setOrderedRes(resultsForStatistic(response));
      setActiveDays(findActiveDays(response));
    }
  };

  useEffect(() => {
    reciveResults();
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
                <button className="btn start-workout ml-auto mr-auto flex w-[150px] items-center justify-center rounded bg-blue-700">
                  <FormattedMessage id="start_train" />
                </button>
              </div>
            </div>
          </div>
          <div className="calendar-container m-2">
            <FormattedMessage id="show_calendar" />
            {/* <div className="calendar border">
              <Calendar />
            </div> */}
            <UserCalendar
              // datesArray={datesForCalendar(new Date())}
              activeDays={activeDays}
            />
          </div>
        </div>
      </main>
    </>
  );
}
