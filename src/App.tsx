import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NanoCity from './pages/NanoCity';
import NanoCityPage from './pages/NanoCityPage';
import BadgeToast from './components/BadgeToast';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/nano-city" element={<NanoCity />} />
        <Route path="/nano-city/challenge" element={<NanoCityPage />} />
      </Routes>
      <BadgeToast />
    </>
  );
}

export default App;
