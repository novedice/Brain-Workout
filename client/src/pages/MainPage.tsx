
import '../assets/logo-brain.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export function MainPage() {
  return (
    <>
      <main className="main">
        <div className="main-container flex justify-center">
          <div className="workout-container m-2 flex w-[40%] flex-col justify-around rounded bg-blue-300 p-2 text-white">
            <div className="today-workout ml-auto mr-auto flex w-[100%] justify-center bg-blue-500">
              TODAY'S WORKOUT
            </div>
            <div className="workout width-[100%] flex flex-row justify-around">
              <div className="workout-image w-[200px]">
                <img src="logo-brain.png"></img>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-center text-xl">
                  A daily taste of assorted cognitive tasks
                </p>
                <button className="btn start-workout ml-auto mr-auto flex w-[150px] items-center justify-center rounded bg-blue-700">
                  START WORKOUT
                </button>
              </div>
            </div>
          </div>
          <div className="calendar-wrap m-2">
            <p>Training calendar</p>
            <div className="calendar border">
              <Calendar />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
