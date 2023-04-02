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
  const { screenClass, sideBarVisibility, currentMainMenu } = useRootData(
    ({ appStore }) => ({
      screenClass: appStore.screenClass.get(),
      sideBarVisibility: appStore.sideBarVisibility.get(),
      currentMainMenu: appStore.currentMainMenu.get(),
    }),
  );

  const styles = stylesMobileDefault;

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
        <div className={styles.mainContentArea}>{children}</div>
      </div>

      <FooterComponent />
    </div>
  );
};

export default DefaultMobile;
