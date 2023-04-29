import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import SidebarComponent from '../../components/SideBarComponent';
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';

interface Props {
  children: React.ReactNode;
  hideSideBar: boolean;
}
const DefaultDesktop = ({ children, hideSideBar }: Props) => {
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
        {(!sideBarVisibility && screenClass !== 'xl') || hideSideBar ? (
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
              ? { marginLeft: '0' }
              : { marginLeft: '180px' }
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
