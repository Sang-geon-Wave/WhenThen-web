import React, { Component } from 'react';
import useRootData from '../../hooks/useRootData';
import CalendarComponent from '../../components/CalendarComponent';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';

import DefaultLayout from '../../layouts/DefaultLayout';

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <CalendarComponent />
    </DefaultLayout>
  );
};

export default CalendarPage;
