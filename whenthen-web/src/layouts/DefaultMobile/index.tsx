import React, { useEffect, useRef, useState } from 'react';
import useRootData from '../../hooks/useRootData';
import { useLocation, Link } from 'react-router-dom';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import SidebarComponent from '../../components/SideBarComponent';
import stylesMobileDefault from './MobileDefault.module.scss';
interface Props {
  children: React.ReactNode;
}
const DefaultMobile = ({ children }: Props) => {
  const {
    screenClass,
    isLogin,
    changeLoginState,
    sideBarVisibility,
    changeSideBarVisibility,
  } = useRootData(({ appStore, loginStore }) => ({
    screenClass: appStore.screenClass.get(),
    isLogin: loginStore.isLogin.get(),
    changeLoginState: loginStore.changeLoginState,
    sideBarVisibility: appStore.sideBarVisibility.get(),
    changeSideBarVisibility: appStore.changeSideBarVisibility,
  }));

  const styles = stylesMobileDefault;
  const nowLocation = useLocation();

  return (
    <div>
      <HeaderComponent />
      <div className={styles.mainBlock}>
        {(!sideBarVisibility && screenClass !== 'xl') ||
        nowLocation.pathname === '/' ? (
          <div></div>
        ) : (
          <div className={styles.sideBarArea}>
            <SidebarComponent />
          </div>
        )}
        {nowLocation.pathname};
        <div className={styles.mainContentArea}>{children}</div>
      </div>

      <FooterComponent />
    </div>
  );
};

export default DefaultMobile;
