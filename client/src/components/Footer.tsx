import '../assets/GitHubLogo.png';
import '../assets/GitHubLogo1.png';

export function Footer() {
  return (
    <footer className="flex h-16 w-[100%] items-center justify-between bg-blue-300 px-12 align-baseline text-lg text-white">
      <div className="github -ml-3 flex">
        <a className="unlink" href="https://github.com/SergeiBuiko">
          <img className="w-[80px]" src="GitHubLogo1.png"></img>
        </a>
        <a className="unlink" href="https://github.com/novedice">
          <img className="w-[80px]" src="GitHubLogo1.png"></img>
        </a>
        <a className="unlink" href="https://github.com/sluzerpp">
          <img className="w-[80px]" src="GitHubLogo1.png"></img>
        </a>
      </div>
      <div className="year">
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
