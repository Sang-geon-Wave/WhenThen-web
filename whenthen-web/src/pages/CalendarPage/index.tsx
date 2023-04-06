import React, { Component } from 'react';
import useRootData from '../../hooks/useRootData';
import CalendarComponent from '../../components/CalendarComponent';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';

import DefaultLayout from '../../layouts/DefaultLayout';

const CalendarPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <DefaultLayout>
      <div className={styles.calendarBlock}>
        <CalendarComponent />
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
