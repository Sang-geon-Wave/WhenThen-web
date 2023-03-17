import React, { useEffect, useRef, useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';
import SidebarComponent from '../SideBarComponent';
import stylesMobileDefault from './MobileDefault.module.scss';
import { observer } from 'mobx-react-lite';
import { action, observe } from 'mobx';

interface PropsLayOutComponent {
  mainContent: JSX.Element;
}

const LayOutComponent = (props: PropsLayOutComponent) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSidebarVisible, setIsSideBarVisible] = useState(false);
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;
  const { mainContent } = props;

  const sideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSideBar = () => {
    setIsSideBarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target as Node)
      ) {
        setIsSideBarVisible(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sideBarRef]);

  return (
    <div>
      <button
        type="button"
        className={styles.sideBarButton}
        onClick={toggleSideBar}
      >
        <img
          className={styles.logoImg}
          src="https://pbs.twimg.com/profile_images/1121985451907137536/2Uq0Ih-2_400x400.jpg"
        />
      </button>
      <HeaderComponent />
      <div className={styles.mainBlock}>
        <div
          ref={sideBarRef}
          className={isSidebarVisible ? styles.sideBarArea : styles.sideBarHide}
        >
          <SidebarComponent />
        </div>
        <div className={styles.mainContentArea}>{mainContent}</div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default LayOutComponent;
