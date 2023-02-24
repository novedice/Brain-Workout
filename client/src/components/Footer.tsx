import '../assets/GitHubLogo.png';
import '../assets/GitHubLogo1.png';

export function Footer() {
  return (
    <footer className="h-18 flex w-[100%] items-center justify-between bg-blue-300 px-12 align-baseline text-lg text-white">
      <div className="github -ml-3 flex items-center">
        <a className="unlink" href="https://github.com/novedice/Brain-Workout">
          <img className="w-[150px]" src="GitHubLogo1.png"></img>
        </a>
        <div className="flex flex-col  justify-start">
          <a className="unlink" href="https://github.com/SergeiBuiko">
            sergeibuiko
          </a>
          <a className="unlink" href="https://github.com/novedice">
            novedice
          </a>
          <a className="unlink" href="https://github.com/sluzerpp">
            sluzerpp
          </a>
        </div>
      </div>
      <div className="year-main">
        <p className="text-header">2023</p>
      </div>
      <div className="rs-school">
        <a className="unlink" href="https://rs.school/js/">
          <img
            className="w-[80px]"
            src="https://rs.school/images/rs_school_js.svg"
            alt="RS-logo"
          ></img>
        </a>
      </div>
    </footer>
  );
}
