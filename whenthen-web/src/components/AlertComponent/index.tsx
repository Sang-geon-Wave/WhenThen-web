import React, { useState, useRef } from 'react';
import { Overlay, Button } from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';

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
  const target = useRef(null);

  return (
    <Overlay
      target={target.current}
      show={alertVisibility}
      //placement="bottom"
    >
      {() => (
        <div className={styles.mainBlock}>
          <div className={styles.alertBlock}>
            {alertMessage}
            <Button onClick={() => changeAlertState(false, null)}>asd</Button>
          </div>
        </div>
      )}
    </Overlay>
  );
};

export default AlertComponent;
