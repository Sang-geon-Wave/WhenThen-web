import React, { useEffect, useRef, useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';
import SidebarComponent from '../SideBarComponent';
import stylesMobileDefault from './MobileDefault.module.scss';

interface PropsLayOutComponent {
  mainContent: JSX.Element;
}

const LayOutComponent = (props: PropsLayOutComponent) => {
  const {
    screenClass,
    isLogin,
    changeLoginState,
    isSideBarVisible,
    changeSideBarState,
  } = useRootData(({ appStore, loginStore, sideBarStore }) => ({
    screenClass: appStore.screenClass.get(),
    isLogin: loginStore.isLogin.get(),
    changeLoginState: loginStore.changeLoginState,
    isSideBarVisible: sideBarStore.isVisible.get(),
    changeSideBarState: sideBarStore.changeSideBarState,
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;
  const { mainContent } = props;

  // const sideBarRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       sideBarRef.current &&
  //       !sideBarRef.current.contains(event.target as Node)
  //     ) {
  //       setIsSideBarVisible(true);
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, [sideBarRef]);

  return (
    <div>
      <HeaderComponent />
      <div className={styles.mainBlock}>
        {!isSideBarVisible ? (
          <div className={styles.sideBarHide}></div>
        ) : (
          <div className={styles.sideBarArea}>
            <SidebarComponent />
          </div>
        )}

        <div className={styles.mainContentArea}>{mainContent}</div>
      </div>

      <FooterComponent />
    </div>
  );
};

export default LayOutComponent;
