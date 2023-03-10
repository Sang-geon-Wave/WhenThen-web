import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing';
import MockPage from './pages/MockPage';
import CalendarPage from './pages/CalendarPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/mock" element={<MockPage />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  </Router>
);

export default App;
