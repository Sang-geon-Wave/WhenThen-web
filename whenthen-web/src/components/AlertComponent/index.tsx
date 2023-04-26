import React, { useEffect, useState, useRef } from 'react';
import { Overlay, Button } from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';

const AlertComponent = () => {
  const { screenClass, alertModalVisibility, alertModalContent, removeAlert } =
    useRootData(({ appStore }) => ({
      screenClass: appStore.screenClass.get(),
      alertModalVisibility: appStore.alertModalVisibility.get(),
      alertModalContent: appStore.alertModalContent.get(),
      removeAlert: appStore.removeAlert,
    }));

  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  const alertRef = useRef<HTMLDivElement>(null);
  const overlayTarget = useRef(null);

  useEffect(() => {
    const onClickEvent = (event: MouseEvent) => {
      const target = event.target as HTMLDivElement;
      if (target === alertRef.current && alertModalVisibility) {
        removeAlert();
      }
    };

    document.addEventListener('click', onClickEvent);

    return () => {
      document.removeEventListener('click', onClickEvent);
    };
  });

  return (
    <Overlay target={overlayTarget.current} show={alertModalVisibility}>
      {() => (
        <div ref={alertRef} className={styles.mainBlock}>
          <div className={styles.alertBlock}>
            <div className={styles.alertContent}>{alertModalContent}</div>
            <div className={styles.buttonBlock}>
              <Button
                variant="primary"
                className={styles.buttonClick}
                onClick={removeAlert}
              >
                확인
              </Button>
              <Button
                variant="outline-danger"
                className={styles.buttonClick}
                onClick={removeAlert}
              >
                취소
              </Button>
            </div>
          </div>
        </div>
      )}
    </Overlay>
  );
};

export default AlertComponent;
