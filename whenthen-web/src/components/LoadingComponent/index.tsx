import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import LoadingImg from '../../assets/images/tail-spin.svg';

const LoadingComponent = () => {
  const { screenClass, loadingVisibility } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
    loadingVisibility: appStore.loadingVisibility.get(),
  }));

  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div>
      {loadingVisibility ? (
        <div className={styles.mainBlock}>
          <img src={LoadingImg} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LoadingComponent;
