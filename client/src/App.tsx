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

export function App() {
  return (
    <div className="flex h-screen flex-col justify-between">
      <Navigation />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/statistic" element={<StatisticPage />} />
        <Route path="/account_settings" element={<AccounSettingsPage />} />
      </Routes>
      <Footer />
      <LogInWindow />
      <SignUpModal />
    </div>
  );
}
