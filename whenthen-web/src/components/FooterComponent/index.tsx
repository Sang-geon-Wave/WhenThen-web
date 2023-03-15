import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';

const FooterComponent = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  return (
    <div className={styles.footer}>
      <div>
        <li>정보1</li>
        <li>정보2</li>
        <li>정보3</li>
      </div>
      <div className={styles.linkButtonSet}>
        <div className={styles.linkButton}>git</div>
        <div className={styles.linkButton}>notion</div>
        <div className={styles.linkButton}></div>
      </div>
    </div>
  );
};
export default FooterComponent;
