import React, { useEffect, useRef } from 'react';
import { useScreenClass } from 'react-grid-system';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useRootData from './hooks/useRootData';
import LandingPage from './pages/LandingPage';
import MockPage from './pages/MockPage';
import DashboardPage from './pages/DashboardPage';
import TimelinePage from './pages/TimelinePage';
import CreateSchedulePage from './pages/CreateSchedulePage';
import LoginPage from './pages/LoginPage';
import AlertComponent from './components/AlertComponent';
import SignupPage from './pages/SignupPage';

const App = () => {
  const componentRef = useRef(null);
  const currentScreenClass = useScreenClass(componentRef);

  const { changeScreenClass, refresh } = useRootData(
    ({ appStore, authStore }) => ({
      changeScreenClass: appStore.changeScreenClass,
      refresh: authStore.refresh,
    }),
  );

  useEffect(() => {
    // Autologin
    refresh();
  }, []);

  useEffect(() => {
    changeScreenClass(
      ['md', 'lg', 'xl', 'xxl', 'xxxl'].includes(currentScreenClass)
        ? 'xl'
        : 'xs',
    );
  }, [currentScreenClass]);

  return (
    <>
      <AlertComponent />
      <Router>
        <Routes>
          <Route path="/mock" element={<MockPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/create-schedule" element={<CreateSchedulePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
