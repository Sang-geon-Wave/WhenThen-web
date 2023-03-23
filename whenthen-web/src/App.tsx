import React, { useEffect, useRef } from 'react';
import { useScreenClass } from 'react-grid-system';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useRootData from './hooks/useRootData';
import LandingPage from './pages/Landing';
import LayoutTestPage from './pages/LayoutTest';
import MockPage from './pages/MockPage';
import CalendarPage from './pages/CalendarPage';
import SidebarComponent from './components/SideBarComponent';
import TimelineDatePage from './pages/TimelineDatePage';
import CreateSchedulePage from './pages/CreateSchedulePage';

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
        <Route path="/layout" element={<LayoutTestPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/createSchedule" element={<CreateSchedulePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
};

export default App;
