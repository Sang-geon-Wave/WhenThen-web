import React from 'react';
import useRootData from '../../hooks/useRootData';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import SidebarComponent from '../../components/SideBarComponent';
import stylesMobileDefault from './MobileDefault.module.scss';
import { useLocation } from 'react-router-dom';
interface Props {
  children: React.ReactNode;
  hideSideBar: boolean;
}
const DefaultMobile = ({ children, hideSideBar }: Props) => {
  const {
    screenClass,
    sideBarVisibility,
    currentMainMenu,
    changeSideBarVisibility,
  } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
    sideBarVisibility: appStore.sideBarVisibility.get(),
    changeSideBarVisibility: appStore.changeSideBarVisibility,
    currentMainMenu: appStore.currentMainMenu.get(),
  }));

  const styles = stylesMobileDefault;
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
        <div className={styles.mainContentArea}>
          {(!sideBarVisibility && screenClass !== 'xl') || hideSideBar ? (
            <div></div>
          ) : (
            <div
              className={styles.sideBarOutside}
              onClick={() => changeSideBarVisibility(false)}
            />
          )}
          {children}
        </div>
      </div>

      <FooterComponent />
    </div>
  );
};

export default DefaultMobile;
