import React, { useEffect, useRef, useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import SidebarComponent from '../../components/SideBarComponent';
import stylesMobileDefault from './MobileDefault.module.scss';
type Props = {
  children: React.ReactNode;
};
const DefaultMobile = ({ children }: Props) => {
  const {
    screenClass,
    isLogin,
    changeLoginState,
    isSideBarVisible,
    changeSideBarState,
  } = useRootData(({ appStore, loginStore }) => ({
    screenClass: appStore.screenClass.get(),
    isLogin: loginStore.isLogin.get(),
    changeLoginState: loginStore.changeLoginState,
    isSideBarVisible: appStore.isVisible.get(),
    changeSideBarState: appStore.changeSideBarState,
  }));
  const isDesktop = screenClass === 'xl';

  const styles = stylesMobileDefault;

  const sideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target as Node)
      ) {
        changeSideBarState(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sideBarRef]);

  return (
    <div>
      <HeaderComponent />
      <div className={styles.mainBlock}>
        {!isSideBarVisible && screenClass !== 'xl' ? (
          <div></div>
        ) : (
          <div className={styles.sideBarArea}>
            <SidebarComponent />
          </div>
        )}

        <div className={styles.mainContentArea}>{children}</div>
      </div>

      <FooterComponent />
    </div>
  );
};

export default DefaultMobile;
