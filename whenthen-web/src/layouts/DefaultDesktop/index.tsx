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
  const { screenClass, sideBarVisibility } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
    sideBarVisibility: appStore.sideBarVisibility.get(),
  }));

  const styles = stylesDesktopDefault;

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

        <div className={styles.childrenArea}>{children}</div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default DefaultDesktop;
