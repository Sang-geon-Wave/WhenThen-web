import React, { useRef, useEffect } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';

import icon from '../../assets/images/menu.png';

export interface SidebarComponentProps {}

const SidebarComponent = () => {
  const { screenClass, sideBarVisibility, changeSideBarVisibility } =
    useRootData(({ appStore }) => ({
      screenClass: appStore.screenClass.get(),
      sideBarVisibility: appStore.sideBarVisibility.get(),
      changeSideBarVisibility: appStore.changeSideBarVisibility,
    }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

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
          <div className={styles.sideBarItem}>
            <div className={styles.sideBarLink}>
              <img src={icon} width="12" height="12" alt="testA" />
              대시보드
            </div>
          </div>
          <div className={styles.sideBarItem}>
            <div className={styles.sideBarLink}>타임라인</div>
          </div>
          <div className={styles.sideBarItem}>
            <div className={styles.sideBarLink}>생성하기</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
