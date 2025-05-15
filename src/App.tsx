import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Dashboard from './pages/Dashboard';
import NanoCity from './pages/NanoCity';
import NanoCityPage from './pages/NanoCityPage';
import './App.css';

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/nano-city" element={<NanoCity />} />
            <Route path="/nano-city/challenge" element={<NanoCityPage />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
