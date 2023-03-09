import React, { useRef, useEffect } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';

import icon from '../../assets/images/menu.png';

import Sidebar from './Sidebar';
import SidebarList from './SidebarList';
import SidebarItem from './SidebarItem';
import SidebarLink from './SidebarLink';
import SidebarSeparator from './SidebarSeparator';

export interface SidebarComponentProps {
  // List: typeof SidebarList;
  // Item: typeof SidebarItem;
  // Link: typeof SidebarLink;
  // Separator: typeof SidebarSeparator;
}

function isActive(path: string) {
  return window.location.pathname.startsWith(path);
}

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
            &nbsp;&nbsp;대시보드
          </SidebarLink>
        </SidebarItem>
        {/* <SidebarSeparator /> */}
        <SidebarItem>
          <SidebarLink to="/" active={isActive('/')}>
            &nbsp;&nbsp;&nbsp;&nbsp;타임라인
          </SidebarLink>
        </SidebarItem>
        <SidebarItem>
          <SidebarLink to="/" active={isActive('/')}>
            &nbsp;&nbsp;&nbsp;&nbsp;생성하기
          </SidebarLink>
        </SidebarItem>
      </SidebarList>
    </Sidebar>
  );
};

export default SidebarComponent;
