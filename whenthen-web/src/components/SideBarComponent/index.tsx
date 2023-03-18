import React, { useRef, useEffect } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';

import icon from '../../assets/images/menu.png';

import { isActive } from '../../utils/sidebarUtils';
import Sidebar from './SidebarItems/Sidebar';
import SidebarList from './SidebarItems/SidebarList';
import SidebarItem from './SidebarItems/SidebarItem';
import SidebarLink from './SidebarItems/SidebarLink';

export interface SidebarComponentProps {}

const SidebarComponent = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <Sidebar>
      <SidebarList>
        <SidebarItem>
          <SidebarLink to="/" active={isActive('/')}>
            <img src={icon} width="12" height="12" alt="testA" />
            대시보드
          </SidebarLink>
        </SidebarItem>
        {/* <SidebarSeparator /> */}
        <SidebarItem>
          <SidebarLink to="/" active={isActive('/')}>
            타임라인
          </SidebarLink>
        </SidebarItem>
        <SidebarItem>
          <SidebarLink to="/" active={isActive('/nowhere')}>
            생성하기
          </SidebarLink>
        </SidebarItem>
      </SidebarList>
    </Sidebar>
  );
};

export default SidebarComponent;
