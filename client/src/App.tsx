import { Route, Routes } from 'react-router-dom';
import './App.css';
import { MainPage } from './pages/MainPage';
import { GamePage } from './pages/GamePage';
import { Navigation } from './components/Navigation';
import { StatisticPage } from './pages/StatisticPage';
import { Footer } from './components/Footer';
import { AccounSettingsPage } from './pages/AccounSettingsPage';
import LogInWindow from './components/modal/LogInWindow';
import SignUpModal from './components/modal/SignUPModal';
import { CurrentGamePage } from './pages/CurrentGamePage';
import { useAppDispatch, useTypeSelector } from './hooks/useTypeSelector';
import jwt_decode from 'jwt-decode';
import {
  CHANGE_LANGUAGE,
  LOGGIN,
  LOGGINUSER,
  UPDATE_TOKEN,
  UPDATE_USER,
} from './constants';
import { IUser } from './types/interfaces';
import { IntlProvider } from 'react-intl';
import { LOCALES } from './i18n/locales';
import { messages } from './i18n/messages';
import { useEffect, useState } from 'react';
import { checkToken, updateUser } from './api/user-requests';
// import { EverydayWorkout } from './pages/EverydayWorkout';

export function App() {
  const user: IUser = useTypeSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const [currentLang, setCurrentLang] = useState(user.lang);
  const authUser = async () => {
    if (localStorage.getItem('token')) {
      document.cookie = `auth=Bearer ${JSON.parse(
        localStorage.getItem('token') as string
      )}`;
      const newToken = await checkToken();
      console.log('new token', newToken);
      if (newToken) {
        dispatch({ type: LOGGIN });
        console.log('decode token:', jwt_decode<IUser>(newToken.token).lang);
        dispatch({
          payload: {
            id: jwt_decode<IUser>(newToken.token).id,
            nickname: jwt_decode<IUser>(newToken.token).nickname,
            loggedIn: true,
            language:
              jwt_decode<IUser>(newToken.token).lang === 'en'
                ? LOCALES.ENGLISH
                : LOCALES.RUSSIAN,
            email: jwt_decode<IUser>(newToken.token).email,
            alwaysSignIn: true,
          },
          type: UPDATE_USER,
        });
        dispatch({
          payload: { token: newToken.token },
          type: UPDATE_TOKEN,
        });
        dispatch({ type: LOGGINUSER });
        setCurrentLang(
          jwt_decode<IUser>(newToken.token).lang === 'en'
            ? LOCALES.ENGLISH
            : LOCALES.RUSSIAN
        );
        document.cookie = `auth=Bearer ${newToken.token}`;
        localStorage.setItem('token', JSON.stringify(newToken.token));
      }
    }
  };

  useEffect(() => {
    authUser();
  }, [localStorage]);

  // TODO updateUser - language
  const handleChangeLang = async () => {
    dispatch({ type: CHANGE_LANGUAGE });
    setCurrentLang(user.lang);
    const responseUpdate = await updateUser({ lang: user.lang });
    if (responseUpdate) {
      document.cookie = `auth=Bearer ${responseUpdate.token}`;
      localStorage.setItem('token', JSON.stringify(responseUpdate.token));
      console.log('token after change lang', responseUpdate.token);
      console.log(
        'decode token after change lang:',
        jwt_decode<IUser>(responseUpdate.token).lang
      );
    }

    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <IntlProvider
      messages={messages[currentLang]}
      locale={currentLang}
      defaultLocale={LOCALES.ENGLISH}
    >
      <div className="flex h-screen flex-col justify-between">
        <Navigation
          currentLang={currentLang}
          handleChangeLang={handleChangeLang}
        />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/games" element={<GamePage />} />
          <Route path={`/games/:CurrentGame`} element={<CurrentGamePage />} />
          <Route path="/statistic" element={<StatisticPage />} />
          <Route path="/account-settings/" element={<AccounSettingsPage />} />
          {/* <Route path="/workout/:gameNumber" element={<EverydayWorkout />} /> */}
        </Routes>
        <Footer />
        <LogInWindow />
        <SignUpModal />
      </div>
    </IntlProvider>
  );
}
