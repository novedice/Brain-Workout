import { Link } from 'react-router-dom';
import '../assets/Logo.png';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SHOW_MODAL } from '../constants';
// import { useTypeSelector } from '../hooks/useTypeSelector';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Navigation() {
  const [lang, setLang] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { openModal } = useTypeSelector((state) => state.openModal);

  const modalShow = () => {
    dispatch({ type: SHOW_MODAL });
  };

  const signUpModallHide = () => {
    dispatch({ type: 'SHOW_SIGNUP' });
  };
  // const [modalActive, setModalActive] = useState(false);
  return (
    <nav className="mb-3 flex h-16 w-[100%] items-center justify-between bg-blue-300 px-12 text-center text-lg text-white">
      <a
        className="unlink mr-2"
        href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rsclone/rsclone.md"
      >
        <img className="w-[50px]" src="Logo.png"></img>
      </a>
      <div>
        <Link to="/" className="mr-5 hover:text-red-200">
          MAIN PAGE
        </Link>
        <Link to="/game" className="mr-5 hover:text-red-200">
          BRAIN GAME
        </Link>
        <Link to="/statistic" className="mr-5 hover:text-red-200">
          STATISTIC
        </Link>
        <Link to="/account_settings" className="mr-5 hover:text-red-200">
          ACCOUNT SETTINGS
        </Link>
      </div>
      <div>
        <Link
          to="/login"
          className="mr-5 hover:text-red-200"
          onClick={() => modalShow()}
        >
          LOG IN
        </Link>
        <Link
          to="/signup"
          className="mr-12 hover:text-red-200"
          onClick={() => signUpModallHide()}
        >
          SIGN UP
        </Link>
        <button
          onClick={() => setLang((prev) => !prev)}
          className="w-16 rounded-full border p-2 hover:bg-red-200"
        >
          {lang ? 'EN' : 'RU'}
        </button>
      </div>
    </nav>
  );
}
