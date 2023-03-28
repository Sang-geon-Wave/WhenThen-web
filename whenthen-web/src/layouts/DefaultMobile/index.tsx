import React from 'react';
import useRootData from '../../hooks/useRootData';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import SidebarComponent from '../../components/SideBarComponent';
import stylesMobileDefault from './MobileDefault.module.scss';
interface Props {
  children: React.ReactNode;
}
const DefaultMobile = ({ children }: Props) => {
  const { screenClass, sideBarVisibility } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
    sideBarVisibility: appStore.sideBarVisibility.get(),
  }));

  const styles = stylesMobileDefault;

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

export default DefaultMobile;
