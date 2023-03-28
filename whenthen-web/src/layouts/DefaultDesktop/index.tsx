import React, { ReactNode, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import SidebarComponent from '../../components/SideBarComponent';

interface Props {
  children: React.ReactNode;
}
const DefaultDesktop = ({ children }: Props) => {
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

  const styles = stylesDesktopDefault;
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
        <div
          className={styles.mainContentArea}
          style={
            screenClass === 'xl' && nowLocation.pathname === '/'
              ? { left: '0' }
              : { left: '180px' }
          }
        >
          {children}
        </div>
      </div>

      <FooterComponent />
    </div>
  );
};

export default DefaultDesktop;
