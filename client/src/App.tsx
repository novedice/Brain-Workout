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
import { useAppDispatch } from './hooks/useTypeSelector';
import { LOGGIN, UPDATE_USER } from './constants';
import { IUser } from './types/interfaces';

export function App() {
  const dispatch = useAppDispatch();
  let thisUser: IUser = {
    email: 'none',
    nickname: 'none',
    language: 'en',
    loggedIn: true,
  };

  if (localStorage.getItem('user')) {
    thisUser = JSON.parse(localStorage.getItem('user') as string);
    dispatch({
      payload: {
        id: thisUser.id,
        nickname: thisUser.nickname,
        loggedIn: true,
        email: thisUser.email,
        language: thisUser.language,
        alwaysSignIn: true,
      },
      type: UPDATE_USER,
    });
    dispatch({ type: LOGGIN });
  }

  return (
    <div className="flex h-screen flex-col justify-between">
      <Navigation />

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
  );
}
