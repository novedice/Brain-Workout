import { Link } from 'react-router-dom';
import '../assets/Logo.png';
import { LOGOUT, SHOW_MODAL, SHOW_SIGNUP, UPDATE_USER } from '../constants';
import { useAppDispatch, useTypeSelector } from '../hooks/useTypeSelector';
import { IToken, IUser } from '../types/interfaces';
import '../assets/speed-match-game/logout.png';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import './navigation.css';

interface INavigationProps {
  currentLang: string;
  handleChangeLang: () => void;
}

export function Navigation({
  currentLang,
  handleChangeLang,
}: INavigationProps) {
  const user: IUser = useTypeSelector((state) => state.userInfo);
  const token: IToken = useTypeSelector((state) => state.tokenInfo);
  const { loggedIn } = useTypeSelector((state) => state.loggedInInfo);
  const [, setUserName] = useState(user.nickname);

  const dispatch = useAppDispatch();

  const modalShow = () => {
    dispatch({ type: SHOW_MODAL });
  };

  const signUpModalShow = () => {
    dispatch({ type: SHOW_SIGNUP });
  };

  const logoutHandler = () => {
    dispatch({ type: LOGOUT });
    dispatch({
      payload: {
        id: 0,
        nickname: '',
        loggedIn: false,
        email: '',
        language: 'en',
        alwaysSignIn: false,
      },
      type: UPDATE_USER,
    });
    sessionStorage.clear();
    localStorage.clear();
  };

  useEffect(() => {
    setUserName(user.nickname);
  }, [token]);

  return (
    <nav className="navigation-container upper-case ">
      <a
        className="unlink mr-2"
        href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rsclone/rsclone.md"
      >
        <img className="logo-main w-[50px]" src="Logo.png"></img>
      </a>
      <div>
        <Link to="/" className="nav-list hover:text-red-200">
          <FormattedMessage id="to_main" />
        </Link>
        <Link to="/games" className="nav-list hover:text-red-200">
          <FormattedMessage id="to_games" />
        </Link>
        <Link to="/statistic" className="nav-list hover:text-red-200">
          <FormattedMessage id="to_statistic" />
        </Link>
      </div>
      {!loggedIn && (
        <div className="upper-case">
          <span
            className="mr-5 cursor-pointer hover:text-red-200"
            onClick={modalShow}
          >
            <FormattedMessage id="to_login" />
          </span>
          <span
            className="mr-12 cursor-pointer hover:text-red-200"
            onClick={signUpModalShow}
          >
            <FormattedMessage id="to_signup" />
          </span>
        </div>
      )}
      {loggedIn && (
        <Link to="/account-settings" className="mr-5 hover:text-red-200">
          <FormattedMessage id="to_settings" />
        </Link>
      )}
      <button
        onClick={() => handleChangeLang()}
        className="button-lang border hover:bg-red-200"
      >
        {currentLang}
      </button>
      {loggedIn && (
        <>
          {' '}
          {/* <p>{userName}</p> */}
          <p>{user.nickname}</p>
          <Link to="/">
            <div
              onClick={() => {
                logoutHandler();
              }}
              className="logout flex items-center justify-between"
            >
              <p className="logout-text mr-2 hover:text-red-200">
                <FormattedMessage id="to_logout" />
              </p>
              <p>
                <img className="h-[20px] w-[20px]" src="logout.png"></img>
              </p>
            </div>
          </Link>
        </>
      )}
    </nav>
  );
}
