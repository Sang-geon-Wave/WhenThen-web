import React, { ReactNode, useEffect, useRef } from 'react';
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

  const sideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target as Node)
      ) {
        changeSideBarVisibility(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sideBarRef]);

  return (
    <div>
      <HeaderComponent />
      <div className={styles.mainBlock}>
        {!sideBarVisibility && screenClass !== 'xl' ? (
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

export default DefaultDesktop;
