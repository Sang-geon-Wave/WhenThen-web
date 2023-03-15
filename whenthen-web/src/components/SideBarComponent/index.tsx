import React, { useRef, useEffect } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';

import icon from '../../assets/images/menu.png';

export interface SidebarComponentProps {}

const SidebarComponent = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
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
  );
};

export default SidebarComponent;
