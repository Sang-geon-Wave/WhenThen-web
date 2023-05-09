import React, { useState } from 'react';
import LoginComponent from '../../components/LoginComponent';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { Link } from 'react-router-dom';
import DefaultLayout from '../../layouts/DefaultLayout';

const LoginPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  return (
    <DefaultLayout hideSideBar={true}>
      <div>
        <h1 className={styles.mainBlock}>
          <Link to="/createSchedule" className={styles.titleText}>
            When Then
          </Link>
        </h1>
        <LoginComponent />
      </div>
    </DefaultLayout>
  );
};

export default LoginPage;
