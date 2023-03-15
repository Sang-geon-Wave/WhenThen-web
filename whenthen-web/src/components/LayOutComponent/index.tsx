import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';
import SidebarComponent from '../SideBarComponent';
// import stylesMobileDefault from './MobileDefault.module.scss';
import { observer } from 'mobx-react-lite';
import { action, observe } from 'mobx';

interface PropsLayOutComponent {
  mainContent: JSX.Element;
}

const LayOutComponent = (props: PropsLayOutComponent) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));

  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  const { mainContent } = props;
  return (
    <div>
      <HeaderComponent />
      <div className={styles.mainBlock}>
        <div className={styles.sideBarArea}>
          <SidebarComponent />
        </div>
        <div className={styles.mainContentArea}>{mainContent}</div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default LayOutComponent;
