import { Link } from 'react-router-dom';
import '../assets/Logo.png';
import { LOGOUT, SHOW_MODAL, SHOW_SIGNUP, UPDATE_USER } from '../constants';
import { useAppDispatch, useTypeSelector } from '../hooks/useTypeSelector';
import { IUser } from '../types/interfaces';
import '../assets/speed-match-game/logout.png';
import { FormattedMessage } from 'react-intl';

interface INavigationProps {
  currentLang: string;
  handleChangeLang: () => void;
}

export function Navigation({
  currentLang,
  handleChangeLang,
}: INavigationProps) {
  const user: IUser = useTypeSelector((state) => state.userInfo);
  const { loggedIn } = useTypeSelector((state) => state.loggedInInfo);
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
        alwaysSignIn: true,
      },
      type: UPDATE_USER,
    });
    localStorage.removeItem('user');
  };

  return (
    <nav className="upper-case mb-3 flex h-16 w-[100%] items-center justify-between bg-blue-300 px-12 text-center text-lg text-white">
      <a
        className="unlink mr-2"
        href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rsclone/rsclone.md"
      >
        <img className="w-[50px]" src="Logo.png"></img>
      </a>
      <div>
        <Link to="/" className="mr-5 hover:text-red-200">
          <FormattedMessage id="to_main" />
        </Link>
        <Link to="/games" className="mr-5 hover:text-red-200">
          <FormattedMessage id="to_games" />
        </Link>
        <Link to="/statistic" className="mr-5 hover:text-red-200">
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
        <Link to="/account_settings" className="mr-5 hover:text-red-200">
          <FormattedMessage id="to_settings" />
        </Link>
      )}
      <button
        onClick={() => handleChangeLang()}
        className="w-16 rounded-full border p-2 hover:bg-red-200"
      >
        {currentLang}
      </button>
      {loggedIn && (
        <>
          {' '}
          <p>{user.nickname}</p>
          <div
            onClick={logoutHandler}
            className="flex items-center justify-between"
          >
            <p className="mr-3">
              <FormattedMessage id="to_logout" />
            </p>
            <p>
              <img className="h-[20px] w-[20px]" src="logout.png"></img>
            </p>
          </div>
        </>
      )}
    </nav>
  );
}
