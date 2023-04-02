import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';

import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  function redirec(data: any) {
    changeMainMenu(data);
    navigate(data);
  }

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
            onClick={() => redirec('/dashBoard')}
          >
            <div className={styles.sideBarLink}>
              <img src={icon} width="12" height="12" alt="testA" />
              대시보드
            </div>
          </div>
          <div
            className={styles.sideBarItem}
            onClick={() => redirec('/timeLine')}
          >
            <div className={styles.sideBarLink}>타임라인</div>
          </div>
          <div
            className={styles.sideBarItem}
            onClick={() => redirec('/createSchedule')}
          >
            <div className={styles.sideBarLink}>생성하기</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
