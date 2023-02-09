import { Link } from 'react-router-dom';
import '../assets/Logo.png';
import { CHANGE_LANGUAGE, SHOW_MODAL, SHOW_SIGNUP } from '../constants';
import { useAppDispatch, useTypeSelector } from '../hooks/useTypeSelector';
import { useState } from 'react';
import { IUser } from '../types/interfaces';

export function Navigation() {
  const user: IUser = useTypeSelector((state) => state.userInfo);
  const { loggedIn } = useTypeSelector((state) => state.loggedInInfo);
  const [lang, setLang] = useState(user.language);
  const dispatch = useAppDispatch();

  const modalShow = () => {
    dispatch({ type: SHOW_MODAL });
  };

  const signUpModalShow = () => {
    dispatch({ type: SHOW_SIGNUP });
  };

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
      </div>
      {!loggedIn && (
        <div>
          <span
            // to="/login"
            className="mr-5 cursor-pointer hover:text-red-200"
            onClick={() => modalShow()}
          >
            LOG IN
          </span>
          <span
            // to="/signup"
            className="mr-12 cursor-pointer hover:text-red-200"
            onClick={() => signUpModalShow()}
          >
            SIGN UP
          </span>
        </div>
      )}
      {loggedIn && (
        <>
          <Link to="/account_settings" className="mr-5 hover:text-red-200">
            ACCOUNT SETTINGS
          </Link>
          <span className="mr-5">{user.nickname}</span>
        </>
      )}
      <button
        onClick={() => {
          dispatch({ type: CHANGE_LANGUAGE });
          setLang(user.language);
          console.log(lang, user.language);
          // console.log('nick', user.nickname, user);
        }}
        className="w-16 rounded-full border p-2 hover:bg-red-200"
      >
        {user.language}
      </button>
    </nav>
  );
}
