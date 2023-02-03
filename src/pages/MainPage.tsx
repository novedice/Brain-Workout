import '../assets/logo-brain.png';

export function MainPage() {
  return (
    <>
      <main className="main">
        <div className="main-container flex">
          <div className="workout-container flex w-[50%] flex-col rounded bg-blue-300 p-2 text-white">
            <div className="today-workout ml-auto mr-auto flex w-[100%] justify-center bg-blue-500">
              TODAY'S WORKOUT
            </div>
            <div className="workout width-[100%] flex flex-row">
              <div className="workout-image w-[200px]">
                <img src="logo-brain.png"></img>
              </div>
              <div className="flex flex-col justify-center">
                <p>A daily taste of assorted cognitive tasks</p>
                <button className="btn start-workout ml-auto mr-auto flex w-[150px] items-center justify-center rounded bg-blue-700">
                  START WORKOUT
                </button>
              </div>
            </div>
          </div>
          <div className="calendar"></div>
        </div>
      </main>
    </>
  );
}
