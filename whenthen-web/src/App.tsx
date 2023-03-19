import React, { useEffect, useRef } from 'react';
import { useScreenClass } from 'react-grid-system';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useRootData from './hooks/useRootData';
import LandingPage from './pages/Landing';
import MockPage from './pages/MockPage';
import SidebarComponent from './components/SideBarComponent';
import TimelineDatePage from './pages/TimelineDatePage';
import CreateSchedulePage from './pages/CreateSchedulePage';
import LoginPage from './pages/LoginPage';

const App = () => {
  const componentRef = useRef(null);
  const currentScreenClass = useScreenClass(componentRef);

  const { changeScreenClass } = useRootData(({ appStore }) => ({
    changeScreenClass: appStore.changeScreenClass,
  }));

  useEffect(() => {
    changeScreenClass(
      ['md', 'lg', 'xl', 'xxl', 'xxxl'].includes(currentScreenClass)
        ? 'xl'
        : 'xs',
    );
  }, [currentScreenClass]);

  return (
    <Router>
      <Routes>
        <Route path="/mock" element={<MockPage />} />
        <Route path="/timeline-date" element={<TimelineDatePage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/createSchedule" element={<CreateSchedulePage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
