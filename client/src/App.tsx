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
import { CHANGE_LANGUAGE, LOGGIN, UPDATE_USER } from './constants';
import { IUser } from './types/interfaces';
import { IntlProvider } from 'react-intl';
import { LOCALES } from './i18n/locales';
import { messages } from './i18n/messages';
import { useEffect, useState } from 'react';

export function App() {
  const user: IUser = useTypeSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const [currentLang, setCurrentLang] = useState(user.language);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const thisUser = JSON.parse(localStorage.getItem('user') as string);
      dispatch({
        payload: {
          id: thisUser.id,
          nickname: thisUser.nickname,
          loggedIn: thisUser.loggedIn,
          email: thisUser.email,
          language: thisUser.language,
          alwaysSignIn: true,
        },
        type: UPDATE_USER,
      });
      if (thisUser.loggedIn) {
        dispatch({ type: LOGGIN });
      }
      setCurrentLang(thisUser.language);
    }
  }, [localStorage]);

  const handleChangeLang = () => {
    dispatch({ type: CHANGE_LANGUAGE });
    setCurrentLang(user.language);
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
          <Route path="/games/" element={<GamePage />} />
          <Route path={`/games/:CurrentGame`} element={<CurrentGamePage />} />
          <Route path="/statistic" element={<StatisticPage />} />
          <Route path="/account_settings" element={<AccounSettingsPage />} />
        </Routes>
        <Footer />
        <LogInWindow />
        <SignUpModal />
      </div>
    </IntlProvider>
  );
}
