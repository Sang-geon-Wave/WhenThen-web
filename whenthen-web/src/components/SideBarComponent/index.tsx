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

  return (
    <div className={styles.sideBarArea}>
      {sideBarVisibility && screenClass !== 'xl' ? (
        <div
          className={styles.sideBarOutside}
          onClick={() => changeSideBarVisibility(false)}
        />
      ) : (
        <div />
      )}

      <div className={styles.sideBar}>
        <div className={styles.sideBarList}>
          <div
            className={styles.sideBarItem}
            onClick={() => navigate('/calendar')}
          >
            <div className={styles.sideBarLink}>
              <img src={icon} width="12" height="12" alt="testA" />
              대시보드
            </div>
          </div>
          <div
            className={styles.sideBarItem}
            onClick={() => navigate('/timeLine')}
          >
            <div className={styles.sideBarLink}>타임라인</div>
          </div>
          <div
            className={styles.sideBarItem}
            onClick={() => navigate('/createSchedule')}
          >
            <div className={styles.sideBarLink}>생성하기</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
