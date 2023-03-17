import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing';
import MockPage from './pages/MockPage';
import SidebarComponent from './components/SideBarComponent';
import TimelineDatePage from './pages/TimelineDatePage';
import CreateSchedulePage from './pages/CreateSchedulePage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/mock" element={<MockPage />} />
      <Route path="/timeline-date" element={<TimelineDatePage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/createSchedule" element={<CreateSchedulePage />} />
    </Routes>
  </Router>
);

export default App;
