import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';

const LoginHeaderComponent = () => {
  const { screenClass, isLogin, changeLoginState } = useRootData(
    ({ appStore, loginStore }) => ({
      screenClass: appStore.screenClass.get(),
      isLogin: loginStore.isLogin.get(),
      changeLoginState: loginStore.changeLoginState,
    }),
  );
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div className={styles.mainBlock}>
      <a href="/createSchedule" className={styles.titleText}>
        <h1>WhenThen</h1>
      </a>
    </div>
  );
};

export default LoginHeaderComponent;
