import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';

import { useLocation, useNavigate } from 'react-router-dom';
import icon from '../../assets/images/menu.png';

const SidebarComponent = () => {
  const {
    screenClass,
    sideBarVisibility,
    changeSideBarVisibility,
    currentMainMenu,
    changeMainMenu,
  } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
    sideBarVisibility: appStore.sideBarVisibility.get(),
    changeSideBarVisibility: appStore.changeSideBarVisibility,
    currentMainMenu: appStore.currentMainMenu.get(),
    changeMainMenu: appStore.changeMainMenu,
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;
  const nowLocation = useLocation();
  const navigate = useNavigate();

  const sideBarButtonClicked = (data: string) => {
    navigate(data);
    changeSideBarVisibility(!sideBarVisibility);
  };
  return (
    <div className={styles.sideBarArea}>
      <div className={styles.sideBar}>
        <div className={styles.sideBarList}>
          <div
            className={styles.sideBarItem}
            onClick={() => sideBarButtonClicked('/timeline')}
          >
            <div className={styles.sideBarLink}>
              {nowLocation.pathname === '/timeline' ? (
                <div>
                  <img src={icon} width="20" height="20" alt="testA" />
                  <span color="black">대시보드</span>
                </div>
              ) : (
                <span>대시보드</span>
              )}
            </div>
          </div>
          <div
            className={styles.sideBarItem}
            onClick={() => sideBarButtonClicked('/timeLine')}
          >
            <div className={styles.sideBarLink}>
              {nowLocation.pathname === '/timeLine' ? (
                <div>
                  <img src={icon} width="20" height="20" alt="testA" />
                  <span color="black">타임라인</span>
                </div>
              ) : (
                <span>타임라인</span>
              )}
            </div>
          </div>
          <div
            className={styles.sideBarItem}
            onClick={() => sideBarButtonClicked('/create-schedule')}
          >
            <div className={styles.sideBarLink}>
              {nowLocation.pathname === '/create-schedule' ? (
                <div>
                  <img src={icon} width="20" height="20" alt="testA" />
                  <span color="black">생성하기</span>
                </div>
              ) : (
                <span>생성하기</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
