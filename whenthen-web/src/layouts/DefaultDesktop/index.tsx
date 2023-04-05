import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import SidebarComponent from '../../components/SideBarComponent';
import { useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}
const DefaultDesktop = ({ children }: Props) => {
  const { screenClass, sideBarVisibility, currentMainMenu } = useRootData(
    ({ appStore }) => ({
      screenClass: appStore.screenClass.get(),
      sideBarVisibility: appStore.sideBarVisibility.get(),
      currentMainMenu: appStore.currentMainMenu.get(),
    }),
  );

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
