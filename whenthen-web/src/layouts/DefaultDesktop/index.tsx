import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import SidebarComponent from '../../components/SideBarComponent';

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

  return (
    <div>
      <HeaderComponent />
      <div className={styles.mainBlock}>
        {(!sideBarVisibility && screenClass !== 'xl') ||
        currentMainMenu === '/' ? (
          <div></div>
        ) : (
          <div className={styles.sideBarArea}>
            <SidebarComponent />
          </div>
        )}
        <div
          className={styles.mainContentArea}
          style={
            screenClass === 'xl' && currentMainMenu === '/'
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
