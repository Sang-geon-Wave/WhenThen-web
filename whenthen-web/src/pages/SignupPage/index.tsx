import React, { useState } from 'react';
import SignupComponent from '../../components/SignupComponent';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  return (
    <div>
      <h1 className={styles.mainBlock}>
        <Link to="/" className={styles.titleText}>
          When Then
        </Link>
      </h1>
      <SignupComponent />
    </div>
  );
};

export default SignupPage;
