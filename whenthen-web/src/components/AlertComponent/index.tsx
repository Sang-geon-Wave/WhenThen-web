import React, { useEffect, useState, useRef } from 'react';
import { Overlay, Button } from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import Card from 'react-bootstrap/Card';

const AlertComponent = () => {
  const { screenClass, alertVisibility, alertMessage, changeAlertState } =
    useRootData(({ appStore, alertStore }) => ({
      screenClass: appStore.screenClass.get(),
      alertVisibility: alertStore.alertVisibility.get(),
      alertMessage: alertStore.alertMessage.get(),
      changeAlertState: alertStore.changeAlertState,
    }));

  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  const alertRef = useRef<HTMLDivElement>(null);
  const overlayTarget = useRef(null);

  useEffect(() => {
    const onClickEvent = (event: MouseEvent) => {
      const target = event.target as HTMLDivElement;
      if (target === alertRef.current && alertVisibility) {
        changeAlertState(null, false);
      }
    };

    document.addEventListener('click', onClickEvent);

    return () => {
      document.removeEventListener('click', onClickEvent);
    };
  });

  return (
    <Overlay target={overlayTarget.current} show={alertVisibility}>
      {() => (
        <div ref={alertRef} className={styles.mainBlock}>
          <div className={styles.alertBlock}>
            <h4>{alertMessage}</h4>
            <div className={styles.buttonBlock}>
              <Button
                variant="primary"
                className={styles.buttonClick}
                onClick={() => changeAlertState(null, false)}
              >
                확인
              </Button>
              <Button
                variant="outline-danger"
                className={styles.buttonClick}
                onClick={() => changeAlertState(null, false)}
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
